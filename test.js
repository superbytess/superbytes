const test = require('ava');
const superbytes = require('.');

test('converts bytes to human readable string format', (t) => {
  t.is(superbytes(0), '0 B');
  t.is(superbytes(0.6), '0.6 B');
  t.is(superbytes(10), '10 B');
  t.is(superbytes(10.6), '10.6 B');
  t.is(superbytes(999), '999 B');
  t.is(superbytes(1023), '1023 B');
  t.is(superbytes(1024), '1.00 KB');
  t.is(superbytes(1025), '1.00 KB');
  t.is(superbytes(1050), '1.03 KB');
  t.is(superbytes(124000, 5), '121.09375 KB');
  t.is(superbytes(424400, 6), '414.453125 KB');
  t.is(superbytes(345987), '337.88 KB');
  t.is(superbytes(1459872), '1.39 MB');
  t.is(superbytes(5214021, 6), '4.972478 MB');
  t.is(superbytes(20000000), '19.07 MB');
  t.is(superbytes(300000001), '286.10 MB');
  t.is(superbytes(912394812345), '849.73 GB');

  t.is(superbytes(10000), '9.77 KB');
  t.is(superbytes(10000, true), '10.00 kB');
});
