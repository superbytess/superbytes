import { ExtensionFactory } from './extension';

const extensionFactory = new ExtensionFactory();
const superbytes2 = extensionFactory.converter;
const superbytes = extensionFactory.superbytes;

export { superbytes2, superbytes };

// --

// const c = converter(10000, { metric: 'IEC', sourceUnit: 'B', targetUnit: 'KiB' });
// console.log(converter(1000).from('B').to('KiB').valueOf());
// console.log(`pr = `, converter(982123).valueOf());
// console.log(superbytes(1000, true));

// console.log(converter(1000).from('GB').to('kB').toString());
// console.log(c.toString());
// console.log('superbytes(10,2)', superbytes(1000, 2));
// console.log('superbytes(10,true)', superbytes(10000, true));

// console.log('superbytes(123334, 2, false)', superbytes(123334, 2));
// console.log('superbytes(123334, 2, true)', superbytes(123334, 2));

// const conv = ConverterHelper.isValidMetric(333);
// console.log(`------`);

console.log(superbytes(0)); // .toBe('0 B');
console.log(superbytes(10.6)); //.toBe('10.6 B');
console.log(superbytes(999)); //.toBe('999 B');
console.log(superbytes(1025)); //.toBe('1.00 KiB');
console.log(superbytes(345987)); //.toBe('337.88 KiB');
console.log(superbytes(1459872, 5)); // .toBe('1.39 MiB');
console.log(superbytes2(1459872, { metric: 'IEC', precision: 5 }).toString());
