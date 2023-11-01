import { converter } from './extensions/superbytes2-extension';
import { superbytes } from './extensions/superbytes-extension';
import { ConverterConstructorOptions, IConverter } from './types/converter-types';
import { Extension } from './types/extension-types';
import { SuperBytesArg, SuperBytesOptions } from './types/superbytes-types';

export class ExtensionFactory implements Extension {
  superbytes(
    value: number,
    arg1?: SuperBytesArg | SuperBytesOptions,
    arg2?: SuperBytesArg
  ): string {
    return superbytes(value, arg1, arg2);
  }

  converter(value: number, params?: ConverterConstructorOptions | undefined): IConverter {
    return converter(value, params);
  }
}
