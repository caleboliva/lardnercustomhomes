import { buildPayload, type InquiryValues } from './validation.ts';

/**
 * Name of the hidden spam-trap field. It must not resemble anything a browser or
 * password manager fills in automatically (company, name, email, address and so on),
 * or real visitors would trip it.
 */
export const TRAP_FIELD = 'lch_check';

export type DeliveryOutcome = 'sent' | 'not-connected' | 'rejected' | 'failed';

export type DeliveryOptions = {
  /** Where to post the enquiry. Empty until a form service is set up. */
  endpoint: string;
  accessKey?: string;
  /** Current value of the spam-trap field. Anything but empty means it was filled in. */
  trap: string;
  fetchFn: typeof fetch;
  timeoutMs?: number;
};

const DEFAULT_TIMEOUT_MS = 15_000;

/**
 * Sends an enquiry and says what happened. Only a 2xx reply from the form service counts
 * as "sent": a tripped spam trap, a missing endpoint, an error reply, a network failure
 * and a timeout are each reported so the page never claims a delivery that did not happen.
 */
export async function deliverInquiry(values: InquiryValues, options: DeliveryOptions): Promise<DeliveryOutcome> {
  if (options.trap !== '') return 'rejected';
  if (!options.endpoint) return 'not-connected';

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  try {
    const response = await options.fetchFn(options.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(buildPayload(values, options.accessKey)),
      signal: controller.signal,
    });
    return response.ok ? 'sent' : 'failed';
  } catch {
    return 'failed';
  } finally {
    clearTimeout(timer);
  }
}
