import { superbytes } from '../../src/index';

describe('Superbytes main module function', () => {
  describe('Legacy args', () => {
    test('Only bytes', () => {
      expect(superbytes(0)).toBe('0 B');
      // expect(superbytes(10.6)).toBe('10.6 B');
      expect(superbytes(999)).toBe('999 B');
      expect(superbytes(1025)).toBe('1.00 KiB');
      expect(superbytes(345987)).toBe('337.88 KiB');
      expect(superbytes(1459872)).toBe('1.39 MiB');
    });

    test('Bytes + digits', () => {
      expect(superbytes(124890, 2)).toBe('121.96 KiB');
      expect(superbytes(124890, 3)).toBe('121.963 KiB');
      expect(superbytes(124890, 6)).toBe('121.962891 KiB');
      expect(superbytes(786600123, 5)).toBe('750.16033 MiB');
      expect(superbytes(40054901000666777, 3)).toBe('35.576 PiB');
      expect(superbytes(40054901000, 8)).toBe('37.30403353 GiB');
    });

    test('Bytes + boolean', () => {
      expect(superbytes(488922012, true)).toBe('488.92 MB');
      expect(superbytes(488922012, false)).toBe('466.27 MiB');
      expect(superbytes(7710092259001, true)).toBe('7.71 TB');
      expect(superbytes(7710092259001, false)).toBe('7.01 TiB');
      expect(superbytes(27092259001, true)).toBe('27.09 GB');
      expect(superbytes(27092259001, false)).toBe('25.23 GiB');
    });

    test('Bytes + digits + boolean', () => {
      expect(superbytes(124890, 2, true)).toBe('124.89 kB');
      expect(superbytes(124890, 3, false)).toBe('121.963 KiB');
      expect(superbytes(124890, 6, true)).toBe('124.890000 kB');
      expect(superbytes(786600123, 5, false)).toBe('750.16033 MiB');
      expect(superbytes(40054901000666777, 3, true)).toBe('40.055 PB');
      expect(superbytes(40054901000, 8, false)).toBe('37.30403353 GiB');
    });

    test('Bytes + boolean + digits', () => {
      expect(superbytes(987102, true, 2)).toBe('987.10 kB');
      expect(superbytes(987102, false, 5)).toBe('963.96680 KiB');
      expect(superbytes(456788900, true, 3)).toBe('456.789 MB');
      expect(superbytes(456788900, true, 4)).toBe('456.7889 MB');
      expect(superbytes(456788900, false, 3)).toBe('435.628 MiB');
      expect(superbytes(201188905, true, 2)).toBe('201.19 MB');
      expect(superbytes(201188905, false, 7)).toBe('191.8686914 MiB');
    });
  });
});
