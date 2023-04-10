const test = require('ava');
const superbytes = require('.');

test('converts bytes to human readable string format', (t) => {
  t.is(superbytes(0), '0 B');
  t.is(superbytes(0.6), '0.6 B');
  t.is(superbytes(10), '10 B');
  t.is(superbytes(10.6), '10.6 B');
  t.is(superbytes(999), '999 B');
  t.is(superbytes(1023), '1023 B');
  t.is(superbytes(1024), '1.00 KiB');
  t.is(superbytes(1025), '1.00 KiB');
  t.is(superbytes(1050), '1.03 KiB');
  t.is(superbytes(124000, 5), '121.09375 KiB');
  t.is(superbytes(424400, 6), '414.453125 KiB');
  t.is(superbytes(345987), '337.88 KiB');
  t.is(superbytes(1459872), '1.39 MiB');
  t.is(superbytes(5214021, 6), '4.972478 MiB');
  t.is(superbytes(20000000), '19.07 MiB');
  t.is(superbytes(300000001), '286.10 MiB');
  t.is(superbytes(912394812345), '849.73 GiB');

  t.is(superbytes(10000), '9.77 KiB');
  t.is(superbytes(998, true), '998 B');
  t.is(superbytes(1000, true), '1.00 kB');
  t.is(superbytes(10000, true), '10.00 kB');
  t.is(superbytes(456121, true), '456.12 kB');
  t.is(superbytes(456171, true), '456.17 kB');
  t.is(superbytes(10000, true), '10.00 kB');
  t.is(superbytes(1535271611, true), '1.54 GB');

  t.is(superbytes(1024, { metric: 'iec'}), '1.00 KiB');
  t.is(superbytes(5243, { metric: 'iec'}), '5.12 KiB');
  t.is(superbytes(8765, { metric: 'iec'}), '8.56 KiB');
  t.is(superbytes(23567, { metric: 'iec'}), '23.01 KiB');
  t.is(superbytes(453567, { metric: 'iec'}), '442.94 KiB');
  t.is(superbytes(5535671, { metric: 'iec'}), '5.28 MiB');
  t.is(superbytes(5535671, { metric: 'iec', digits: 3}), '5.279 MiB');
  t.is(superbytes(5535671, { metric: 'iec', digits: 4}), '5.2792 MiB');
  t.is(superbytes(5535671, { metric: 'iec', digits: 0}), '5 MiB');
  t.is(superbytes(453527161, { metric: 'iec'}), '432.52 MiB');
  t.is(superbytes(453527161, { metric: 'iec', digits: 3}), '432.517 MiB');
  t.is(superbytes(453527161, { metric: 'iec', digits: 4}), '432.5172 MiB');
  t.is(superbytes(453527161, { metric: 'iec', digits: 0}), '433 MiB');
});
