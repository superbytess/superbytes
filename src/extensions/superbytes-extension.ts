import { ArgsFacade } from '../args/args';
// import { ConverterHelper } from '../helpers/converter-helper.helper';
import {
  SuperBytesArg,
  SuperBytesArgDefinition,
  SuperBytesOptions,
} from '../types/superbytes-types';
import { converter } from './converter-extension';

export const superbytes = <T extends SuperBytesArg | SuperBytesOptions, K extends SuperBytesArg>(
  value: number,
  arg1?: T,
  arg2?: K
): string => {
  const args: SuperBytesArgDefinition = new ArgsFacade(arg1, arg2).getArgsDefinition();
  // console.log(`=== args`, args);
  return converter(value, {
    metric: args.metric,
    precision: args.digits,
    sourceUnit: 'B',
  }).toString();
};
