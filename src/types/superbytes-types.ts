import { Metric } from './converter-types';

export type SuperBytesOptions = {
  metric: Metric;
  digits: number;
};

export type SuperBytesArg = undefined | number | boolean;

export type SuperBytesArgDefinition = {
  divider: number;
  units: string[];
  digits: number;
  metric: Metric;
};

export const objectArgs: {
  keys: Array<string>;
  metric: Metric[];
  map: { SI: boolean; IEC: boolean };
} = {
  keys: ['metric', 'digits'],
  metric: ['IEC', 'SI'],
  map: {
    SI: true,
    IEC: false,
  },
};
