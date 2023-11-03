import { superbytes2 } from "../../src";

describe('Converter extension (superbytes2)', () => {
  test('Only value toString', () => {
    expect(superbytes2(0).toString()).toBe('0 B');
    expect(superbytes2(10.6).toString()).toBe('10.6 B');
    expect(superbytes2(999).toString()).toBe('999 B');
    expect(superbytes2(1025).toString()).toBe('1.00 KiB');
    expect(superbytes2(345987).toString()).toBe('337.88 KiB');
    expect(superbytes2(1459872).toString()).toBe('1.39 MiB');
  });

  test('Value + metric SI + toString', () => {
    expect(superbytes2(488922012, { metric: 'SI' }).toString()).toBe('488.92 MB');
    expect(superbytes2(488922012, { metric: 'IEC' }).toString()).toBe('466.27 MiB');
    expect(superbytes2(7710092259001, { metric: 'SI' }).toString()).toBe('7.71 TB');
    expect(superbytes2(7710092259001, { metric: 'IEC' }).toString()).toBe('7.01 TiB');
    expect(superbytes2(27092259001, { metric: 'SI' }).toString()).toBe('27.09 GB');
    expect(superbytes2(27092259001, { metric: 'IEC' }).toString()).toBe('25.23 GiB');
  });

  test('Value + precision + toString', () => {
    expect(superbytes2(124890, { precision: 2 }).toString()).toBe('121.96 KiB');
    expect(superbytes2(124890, { precision: 3 }).toString()).toBe('121.963 KiB');
    expect(superbytes2(124890, { precision: 6 }).toString()).toBe('121.962891 KiB');
    expect(superbytes2(786600123, { precision: 5 }).toString()).toBe('750.16033 MiB');
    expect(superbytes2(40054901000666777, { precision: 3 }).toString()).toBe('35.576 PiB');
    expect(superbytes2(40054901000, { precision: 8 }).toString()).toBe('37.30403353 GiB');
  })

  test('Value + metric + precision + toString', () => {
    expect(superbytes2(124890, { metric: 'SI', precision: 2 }).toString()).toBe('124.89 kB');
    expect(superbytes2(124890, { metric: 'IEC', precision: 3 }).toString()).toBe('121.963 KiB');
    expect(superbytes2(124890, { metric: 'SI', precision: 6 }).toString()).toBe('124.890000 kB');
    expect(superbytes2(786600123, { metric: 'IEC', precision: 5 }).toString()).toBe('750.16033 MiB');
    expect(superbytes2(40054901000666777, { metric: 'SI', precision: 3 }).toString()).toBe('40.055 PB');
    expect(superbytes2(40054901000, { metric: 'IEC', precision: 8 }).toString()).toBe('37.30403353 GiB');
  })
});
