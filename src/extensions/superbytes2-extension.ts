import { Converter } from '../converter';
import { ConverterHelper } from '../helpers/converter-helper.helper';
import {
  ConverterConstructor,
  ConverterConstructorOptions,
  IConverter,
} from '../types/converter-types';

export const converter: ConverterConstructor = function (
  value: number,
  params?: ConverterConstructorOptions
): IConverter {
  return new Converter(
    Number(value),
    ConverterHelper.isValidUnit(params?.sourceUnit) ? params!.sourceUnit : undefined,
    ConverterHelper.isValidUnit(params?.targetUnit) ? params!.targetUnit : undefined,
    ConverterHelper.isValidMetric(params?.metric) ? params!.metric : undefined,
    params?.precision
  );
} as ConverterConstructor;
