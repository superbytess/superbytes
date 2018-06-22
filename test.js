import test from 'ava';
import m from '.';

test('converts bytes to human readable string format', t => {
	t.is(m(0), '0 B');
	t.is(m(0.6), '0.6 B');
	t.is(m(10), '10 B');
	t.is(m(10.6), '10.6 B');
	t.is(m(999), '999 B');
	t.is(m(1023), '1023 B');
	t.is(m(1024), '1.00 KB');
	t.is(m(1025), '1.00 KB');
	t.is(m(1050), '1.03 KB');
	t.is(m(345987), '337.88 KB');
	t.is(m(1459872), '1.39 MB');
  t.is(m(20000000), '19.07 MB');
  t.is(m(300000001), '286.10 MB');
  t.is(m(912394812345), '849.73 GB');
});
