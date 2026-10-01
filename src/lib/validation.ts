export const PRICE_POINTS = ['Under $1M', '$1M–$2M', '$2M–$3M', '$3M+'] as const;
export const REALTOR_OPTIONS = ['Yes', 'No'] as const;
export const REFERRAL_OPTIONS = [
  'Friend or family',
  'Realtor',
  'Instagram',
  'Facebook',
  'Google search',
  'Saw a home or sign',
  'Lardner Group',
  'Other',
] as const;

export const LIMITS = { name: 80, email: 254, message: 2000, referralOther: 120 } as const;

export type InquiryValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  pricePoint: string;
  realtor: string;
  referral: string;
  referralOther: string;
};

export type InquiryField = keyof InquiryValues;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

/** In the order the fields appear on the form. */
export const INQUIRY_FIELDS: readonly InquiryField[] = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'message',
  'pricePoint',
  'realtor',
  'referral',
  'referralOther',
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL.test(value.trim());
}

/** Returns the ten digits of a US phone number, or null if `value` is not one. */
export function normalizePhone(value: string): string | null {
  if (/[^\d\s().+-]/.test(value)) return null;
  let digits = value.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  return digits.length === 10 ? digits : null;
}

export function formatPhone(digits: string): string {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function tooLong(value: string, max: number, label: string): string | undefined {
  return value.length > max ? `${label} must be ${max} characters or fewer.` : undefined;
}

function isOneOf(options: readonly string[], value: string): boolean {
  return options.includes(value);
}

/** Returns a message for the visitor, or undefined when the field is fine. */
export function validateField(field: InquiryField, values: InquiryValues): string | undefined {
  const value = values[field].trim();
  switch (field) {
    case 'firstName':
      return value ? tooLong(value, LIMITS.name, 'First name') : 'Enter your first name.';
    case 'lastName':
      return value ? tooLong(value, LIMITS.name, 'Last name') : 'Enter your last name.';
    case 'email':
      if (!value) return 'Enter your email address.';
      return value.length <= LIMITS.email && isValidEmail(value)
        ? undefined
        : 'Enter an email address like name@example.com.';
    case 'phone':
      if (!value) return 'Enter your phone number.';
      return normalizePhone(value) ? undefined : 'Enter a 10-digit phone number, like (214) 555-0100.';
    case 'message':
      return tooLong(value, LIMITS.message, 'Your message');
    case 'pricePoint':
      return isOneOf(PRICE_POINTS, value) ? undefined : 'Choose a price point.';
    case 'realtor':
      return isOneOf(REALTOR_OPTIONS, value) ? undefined : 'Choose yes or no.';
    case 'referral':
      return !value || isOneOf(REFERRAL_OPTIONS, value) ? undefined : 'Choose an option from the list.';
    case 'referralOther':
      return tooLong(value, LIMITS.referralOther, 'Your answer');
  }
}

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  for (const field of INQUIRY_FIELDS) {
    const message = validateField(field, values);
    if (message) errors[field] = message;
  }
  return errors;
}

/** The message sent to the form service. Field names are chosen to read well in an email. */
export function buildPayload(values: InquiryValues, accessKey = ''): Record<string, string> {
  const firstName = values.firstName.trim();
  const lastName = values.lastName.trim();
  const digits = normalizePhone(values.phone);
  const other = values.referralOther.trim();

  const payload: Record<string, string> = {
    subject: `New website inquiry from ${firstName} ${lastName}`,
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    email: values.email.trim(),
    phone: digits ? formatPhone(digits) : values.phone.trim(),
    message: values.message.trim(),
    pricePoint: values.pricePoint,
    workingWithRealtor: values.realtor,
    howDidYouHear: values.referral === 'Other' && other ? `Other: ${other}` : values.referral,
    source: 'lardnercustomhomes.com inventory form',
  };
  if (accessKey) payload.access_key = accessKey;
  return payload;
}
