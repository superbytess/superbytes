import { ConverterConstructorOptions, IConverter } from './converter-types';
import { SuperBytesArg } from './superbytes-types';

export interface Extension {
  converter(value: number, params?: ConverterConstructorOptions): IConverter;
  superbytes(value: number, arg1: SuperBytesArg): string;
}
