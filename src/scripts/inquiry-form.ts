import {
  buildPayload,
  formatPhone,
  normalizePhone,
  validateField,
  validateInquiry,
  INQUIRY_FIELDS,
  type InquiryErrors,
  type InquiryField,
  type InquiryValues,
} from '../lib/validation.ts';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const TIMEOUT_MS = 15_000;
const DEMO_DELAY_MS = 1_200;
const MESSAGES = {
  notConnected: "This form isn't connected yet, so your message was not sent.",
  failed: 'Sorry, something went wrong and your message was not sent.',
  demoSuccess: 'Demo mode: this is how a successful send looks. Nothing was sent.',
};

class NotConnectedError extends Error {}

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

function isInquiryField(name: string | undefined): name is InquiryField {
  return INQUIRY_FIELDS.includes(name as InquiryField);
}

export function initInquiryForm(): void {
  const root = document.querySelector<HTMLElement>('[data-inquiry]');
  const form = root?.querySelector<HTMLFormElement>('[data-inquiry-form]');
  const submit = form?.querySelector<HTMLButtonElement>('[data-inquiry-submit]');
  const submitLabel = form?.querySelector<HTMLElement>('[data-inquiry-submit-label]');
  const alert = form?.querySelector<HTMLElement>('[data-inquiry-alert]');
  const alertTitle = form?.querySelector<HTMLElement>('[data-inquiry-alert-title]');
  const success = root?.querySelector<HTMLElement>('[data-inquiry-success]');
  const successText = root?.querySelector<HTMLElement>('[data-inquiry-success-text]');
  const referral = form?.querySelector<HTMLSelectElement>('select[name="referral"]');
  const referralOther = form?.querySelector<HTMLElement>('[data-referral-other]');
  if (!form || !submit || !submitLabel || !alert || !alertTitle || !success || !successText || !referral || !referralOther) {
    return;
  }

  // The script takes over validation so messages match the site's wording.
  form.noValidate = true;

  const params = new URLSearchParams(window.location.search);
  const demo = form.hasAttribute('data-demo') ? params.get('formDemo') : null;
  let status: Status = 'idle';

  const readValues = (): InquiryValues => {
    const data = new FormData(form);
    const get = (name: InquiryField) => String(data.get(name) ?? '');
    return {
      firstName: get('firstName'),
      lastName: get('lastName'),
      email: get('email'),
      phone: get('phone'),
      message: get('message'),
      pricePoint: get('pricePoint'),
      realtor: get('realtor'),
      referral: get('referral'),
      referralOther: get('referralOther'),
    };
  };

  const wrapperFor = (field: InquiryField) => form.querySelector<HTMLElement>(`[data-field="${field}"]`);
  const controlIn = (wrapper: HTMLElement) =>
    wrapper.querySelector<HTMLElement>('input, textarea, select');

  const setError = (field: InquiryField, message: string | undefined) => {
    const wrapper = wrapperFor(field);
    const error = wrapper?.querySelector<HTMLElement>('.field__error');
    const text = error?.querySelector<HTMLElement>('[data-error-text]');
    if (!wrapper || !error || !text) return;
    // Radio groups are described at the group; single controls at the control.
    const target = wrapper.matches('fieldset') ? wrapper : controlIn(wrapper);
    if (!target) return;

    if (message) {
      text.textContent = message;
      error.hidden = false;
      wrapper.setAttribute('data-invalid', '');
      target.setAttribute('aria-invalid', 'true');
      target.setAttribute('aria-describedby', error.id);
    } else {
      text.textContent = '';
      error.hidden = true;
      wrapper.removeAttribute('data-invalid');
      target.removeAttribute('aria-invalid');
      target.removeAttribute('aria-describedby');
    }
  };

  const showErrors = (errors: InquiryErrors) => {
    for (const field of INQUIRY_FIELDS) setError(field, errors[field]);
  };

  const setStatus = (next: Status, message = '') => {
    status = next;
    const busy = next === 'submitting';
    form.setAttribute('aria-busy', String(busy));
    submit.setAttribute('aria-disabled', String(busy));
    submit.toggleAttribute('data-loading', busy);
    submitLabel.textContent = busy ? 'Sending…' : next === 'error' ? 'Try again' : 'Send';

    if (next === 'error') {
      alertTitle.textContent = message;
      alert.hidden = false;
      alert.focus();
    } else {
      alert.hidden = true;
    }

    if (next === 'success') {
      if (message) successText.textContent = message;
      form.hidden = true;
      success.hidden = false;
      success.focus();
    }
  };

  const deliver = async (values: InquiryValues): Promise<void> => {
    // The spam trap was filled in: drop the message without telling the bot.
    if (String(new FormData(form).get('company') ?? '') !== '') return;

    if (demo === 'success' || demo === 'error') {
      await wait(DEMO_DELAY_MS);
      if (demo === 'error') throw new Error('Demo error');
      return;
    }

    const endpoint = form.dataset.endpoint;
    if (!endpoint) throw new NotConnectedError();

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(buildPayload(values, form.dataset.accessKey)),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Form service responded with ${response.status}`);
    } finally {
      window.clearTimeout(timer);
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const values = readValues();
    const errors = validateInquiry(values);
    showErrors(errors);
    const firstInvalid = INQUIRY_FIELDS.find((field) => errors[field]);
    if (firstInvalid) {
      const wrapper = wrapperFor(firstInvalid);
      if (wrapper) controlIn(wrapper)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      await deliver(values);
      setStatus('success', demo === 'success' ? MESSAGES.demoSuccess : '');
    } catch (error) {
      setStatus('error', error instanceof NotConnectedError ? MESSAGES.notConnected : MESSAGES.failed);
    }
  });

  // Check a field when the visitor leaves it.
  form.addEventListener('focusout', (event) => {
    const wrapper = (event.target as Element).closest<HTMLElement>('[data-field]');
    const field = wrapper?.dataset.field;
    if (!wrapper || !isInquiryField(field)) return;
    if (wrapper.contains(event.relatedTarget as Node | null)) return;

    if (field === 'phone') {
      const input = controlIn(wrapper) as HTMLInputElement | null;
      const digits = input ? normalizePhone(input.value) : null;
      if (input && digits) input.value = formatPhone(digits);
    }
    setError(field, validateField(field, readValues()));
  });

  // Clear a message as soon as the problem is fixed.
  const recheck = (event: Event) => {
    const wrapper = (event.target as Element).closest<HTMLElement>('[data-field]');
    const field = wrapper?.dataset.field;
    if (!wrapper || !isInquiryField(field) || !wrapper.hasAttribute('data-invalid')) return;
    setError(field, validateField(field, readValues()));
  };
  form.addEventListener('input', recheck);
  form.addEventListener('change', recheck);

  const syncOther = () => {
    referralOther.hidden = referral.value !== 'Other';
  };
  referral.addEventListener('change', syncOther);
  syncOther();

  // Arriving from a listing: start the message for them.
  const home = params.get('home')?.replace(/[\u0000-\u001f]/g, '').trim().slice(0, 120);
  const message = form.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
  if (home && message && !message.value) message.value = `I'm interested in ${home}.`;
}
