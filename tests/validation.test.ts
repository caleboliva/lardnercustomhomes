import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildMailto,
  buildPayload,
  formatPhone,
  isValidEmail,
  LIMITS,
  normalizePhone,
  validateField,
  validateInquiry,
  type InquiryValues,
} from '../src/lib/validation.ts';

const valid: InquiryValues = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  phone: '(214) 555-0100',
  interest: '',
  timeline: '',
  message: '',
  pricePoint: '$1M–$2M',
  realtor: 'No',
  referral: '',
  referralOther: '',
};

const empty: InquiryValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  interest: '',
  timeline: '',
  message: '',
  pricePoint: '',
  realtor: '',
  referral: '',
  referralOther: '',
};

test('a complete inquiry has no errors, and the optional fields may be left empty', () => {
  assert.deepEqual(validateInquiry(valid), {});
});

test('an empty form reports exactly the six required fields', () => {
  assert.deepEqual(Object.keys(validateInquiry(empty)).sort(), [
    'email',
    'firstName',
    'lastName',
    'phone',
    'pricePoint',
    'realtor',
  ]);
});

test('whitespace-only required fields count as empty', () => {
  assert.equal(validateField('firstName', { ...valid, firstName: '   ' }), 'Enter your first name.');
  assert.equal(validateField('lastName', { ...valid, lastName: '\t' }), 'Enter your last name.');
  assert.equal(validateField('email', { ...valid, email: '  ' }), 'Enter your email address.');
  assert.equal(validateField('phone', { ...valid, phone: ' ' }), 'Enter your phone number.');
});

test('isValidEmail() accepts ordinary addresses and ignores surrounding spaces', () => {
  for (const email of ['ada@example.com', 'first.last+tag@sub.example.co', '  ada@example.com  ']) {
    assert.equal(isValidEmail(email), true, email);
  }
});

test('isValidEmail() rejects malformed addresses', () => {
  for (const email of ['', 'ada', 'ada@', '@example.com', 'ada@example', 'ada @example.com', 'ada@exa mple.com']) {
    assert.equal(isValidEmail(email), false, email);
  }
});

test('normalizePhone() accepts the ways people type a US number', () => {
  for (const phone of [
    '2145550100',
    '(214) 555-0100',
    '214-555-0100',
    '214.555.0100',
    '214 555 0100',
    '+1 (214) 555-0100',
    '1-214-555-0100',
  ]) {
    assert.equal(normalizePhone(phone), '2145550100', phone);
  }
});

test('normalizePhone() rejects numbers that are too short, too long, or not numbers', () => {
  for (const phone of ['', '555-0100', '214555010', '21455501001', '2-214-555-0100', 'call me', '214-555-01OO']) {
    assert.equal(normalizePhone(phone), null, phone);
  }
});

test('formatPhone() writes ten digits in the standard US form', () => {
  assert.equal(formatPhone('2145550100'), '(214) 555-0100');
});

test('price point and realtor must be one of the offered choices', () => {
  assert.equal(validateField('pricePoint', { ...valid, pricePoint: '' }), 'Choose a price point.');
  assert.equal(validateField('pricePoint', { ...valid, pricePoint: '$9M' }), 'Choose a price point.');
  assert.equal(validateField('pricePoint', { ...valid, pricePoint: '$3M+' }), undefined);
  assert.equal(validateField('realtor', { ...valid, realtor: 'Maybe' }), 'Choose yes or no.');
  assert.equal(validateField('realtor', { ...valid, realtor: 'Yes' }), undefined);
});

test('"how did you hear about us" is optional but must come from the list', () => {
  assert.equal(validateField('referral', { ...valid, referral: '' }), undefined);
  assert.equal(validateField('referral', { ...valid, referral: 'Instagram' }), undefined);
  assert.equal(validateField('referral', { ...valid, referral: 'Carrier pigeon' }), 'Choose an option from the list.');
});

test('over-long entries are rejected with the limit in the message', () => {
  const long = (n: number) => 'x'.repeat(n);
  assert.equal(validateField('firstName', { ...valid, firstName: long(LIMITS.name) }), undefined);
  assert.equal(
    validateField('firstName', { ...valid, firstName: long(LIMITS.name + 1) }),
    'First name must be 80 characters or fewer.',
  );
  assert.equal(
    validateField('message', { ...valid, message: long(LIMITS.message + 1) }),
    'Your message must be 2000 characters or fewer.',
  );
  assert.equal(
    validateField('referralOther', { ...valid, referralOther: long(LIMITS.referralOther + 1) }),
    'Your answer must be 120 characters or fewer.',
  );
});

test('buildPayload() trims text, formats the phone and names the sender', () => {
  const payload = buildPayload({ ...valid, firstName: ' Ada ', phone: '214.555.0100', message: ' A lot in Uptown. ' });
  assert.equal(payload.name, 'Ada Lovelace');
  assert.equal(payload.subject, 'Inventory sign-up from Ada Lovelace');
  assert.equal(payload.phone, '(214) 555-0100');
  assert.equal(payload.message, 'A lot in Uptown.');
  assert.equal(payload.pricePoint, '$1M–$2M');
  assert.equal(payload.workingWithRealtor, 'No');
  assert.equal('access_key' in payload, false);
});

test('buildPayload() folds the "Other" answer in and adds an access key only when given', () => {
  const other = buildPayload({ ...valid, referral: 'Other', referralOther: ' A yard sign ' }, 'public-key');
  assert.equal(other.howDidYouHear, 'Other: A yard sign');
  assert.equal(other.access_key, 'public-key');
  assert.equal(buildPayload({ ...valid, referral: 'Other' }).howDidYouHear, 'Other');
  assert.equal(buildPayload({ ...valid, referral: 'Realtor', referralOther: 'ignored' }).howDidYouHear, 'Realtor');
});

test('"I\'m looking for" and the timeline are optional but must come from the lists', () => {
  assert.equal(validateField('interest', { ...valid, interest: 'Lots, Homes for sale' }), undefined);
  assert.equal(validateField('interest', { ...valid, interest: 'Lots, A castle' }), 'Choose from the options shown.');
  assert.equal(validateField('timeline', { ...valid, timeline: '3 to 6 months' }), undefined);
  assert.equal(validateField('timeline', { ...valid, timeline: 'Tomorrow' }), 'Choose an option from the list.');
});

test('buildPayload() carries what the visitor is looking for and when', () => {
  const payload = buildPayload({ ...valid, interest: 'Lots, Building on my own lot', timeline: 'Just exploring' });
  assert.equal(payload.lookingFor, 'Lots, Building on my own lot');
  assert.equal(payload.timeline, 'Just exploring');
  assert.equal(payload.source, 'lardnercustomhomes.com inventory sign-up');
});

test('buildMailto() writes the sign-up into an email to Colin', () => {
  const link = buildMailto({ ...valid, interest: 'Lots', message: 'Near a park & a school.' }, 'colin@example.com');
  const url = new URL(link);
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'colin@example.com');
  assert.equal(url.searchParams.get('subject'), 'Inventory sign-up from Ada Lovelace');
  const body = url.searchParams.get('body') ?? '';
  assert.match(body, /^Name: Ada Lovelace\r\nEmail: ada@example\.com\r\nPhone: \(214\) 555-0100\r\nLooking for: Lots\r\n/);
  assert.match(body, /Near a park & a school\.$/);
  assert.doesNotMatch(body, /Timeline:/);
});

test('buildMailto() shortens a very long message so email apps accept the link', () => {
  const link = buildMailto({ ...valid, message: 'x'.repeat(1900) }, 'colin@example.com');
  const body = new URL(link).searchParams.get('body') ?? '';
  assert.ok(body.endsWith('x'.repeat(10) + '…'));
  assert.ok(body.length < 1500);
});
