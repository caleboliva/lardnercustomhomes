import assert from 'node:assert/strict';
import test from 'node:test';
import { deliverInquiry, TRAP_FIELD } from '../src/lib/delivery.ts';
import type { InquiryValues } from '../src/lib/validation.ts';

const values: InquiryValues = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  phone: '(214) 555-0100',
  message: 'A lot in Uptown.',
  pricePoint: '$1M–$2M',
  realtor: 'No',
  referral: '',
  referralOther: '',
};

type Call = { url: string; init: RequestInit };

/** A stand-in for the browser's fetch that records what it was asked to send. */
function recordingFetch(respond: (call: Call) => Promise<Response>) {
  const calls: Call[] = [];
  const fetchFn = ((url: string | URL | Request, init: RequestInit = {}) => {
    const call = { url: String(url), init };
    calls.push(call);
    return respond(call);
  }) as typeof fetch;
  return { calls, fetchFn };
}

const ok = () => Promise.resolve(new Response('{}', { status: 200 }));

test('a filled spam trap is never reported as sent, and nothing is sent', async () => {
  const { calls, fetchFn } = recordingFetch(ok);
  const outcome = await deliverInquiry(values, { endpoint: 'https://forms.test/submit', trap: 'Acme Inc', fetchFn });
  assert.equal(outcome, 'rejected');
  assert.equal(calls.length, 0);
});

test('the spam trap field is not one that browsers auto-fill', () => {
  assert.doesNotMatch(TRAP_FIELD, /company|organi[sz]ation|name|email|phone|tel|address|street|city|zip|url|website/i);
});

test('with no endpoint configured the outcome is not-connected and nothing is sent', async () => {
  const { calls, fetchFn } = recordingFetch(ok);
  assert.equal(await deliverInquiry(values, { endpoint: '', trap: '', fetchFn }), 'not-connected');
  assert.equal(calls.length, 0);
});

test('a 2xx response is sent, posted once as JSON with the payload', async () => {
  const { calls, fetchFn } = recordingFetch(ok);
  const outcome = await deliverInquiry(values, {
    endpoint: 'https://forms.test/submit',
    accessKey: 'public-key',
    trap: '',
    fetchFn,
  });
  assert.equal(outcome, 'sent');
  assert.equal(calls.length, 1);
  const call = calls[0];
  assert.ok(call);
  assert.equal(call.url, 'https://forms.test/submit');
  assert.equal(call.init.method, 'POST');
  const body = JSON.parse(String(call.init.body));
  assert.equal(body.name, 'Ada Lovelace');
  assert.equal(body.phone, '(214) 555-0100');
  assert.equal(body.access_key, 'public-key');
});

test('a non-2xx response is failed', async () => {
  const { fetchFn } = recordingFetch(() => Promise.resolve(new Response('{}', { status: 500 })));
  assert.equal(await deliverInquiry(values, { endpoint: 'https://forms.test/submit', trap: '', fetchFn }), 'failed');
});

test('a network error is failed', async () => {
  const { fetchFn } = recordingFetch(() => Promise.reject(new TypeError('Failed to fetch')));
  assert.equal(await deliverInquiry(values, { endpoint: 'https://forms.test/submit', trap: '', fetchFn }), 'failed');
});

test('a service that never answers is aborted after the timeout and reported as failed', async () => {
  let aborted = false;
  const { fetchFn } = recordingFetch(
    ({ init }) =>
      new Promise<Response>((_resolve, reject) => {
        init.signal?.addEventListener('abort', () => {
          aborted = true;
          reject(new DOMException('Aborted', 'AbortError'));
        });
      }),
  );
  const outcome = await deliverInquiry(values, {
    endpoint: 'https://forms.test/submit',
    trap: '',
    fetchFn,
    timeoutMs: 20,
  });
  assert.equal(outcome, 'failed');
  assert.equal(aborted, true);
});
