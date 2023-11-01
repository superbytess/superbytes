export const metrics = ['SI', 'IEC'] as const satisfies ReadonlyArray<Uppercase<string>>;

export const unitScale = {
  IEC: {
    multiplier: 1024,
    units: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
  },
  SI: {
    multiplier: 1000,
    units: ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  },
} as const satisfies UnitScaleDefinition;

export const defaultPrecision = 2;

export type Metric = (typeof metrics)[number];

export type UnitScale = {
  multiplier: number;
  units: ReadonlyArray<string>;
};

export type UnitScaleDefinition = {
  [key in Metric]: UnitScale;
};

export type UnitScaleKey = keyof typeof unitScale;

export type Units<TScale extends UnitScaleKey> = (typeof unitScale)[TScale]['units'][number];

export type UnitConversionResult<TMetric extends UnitScaleKey> = {
  value: number;
  unit: Units<TMetric>;
  metric: Metric;
};

export interface IConverter {
  toString(): string;
  valueOf(): number;
  from(sourceUnit: Units<UnitScaleKey>): IConverter;
  to(targetUnit: Units<UnitScaleKey>): IConverter;
}

export interface ConverterConstructor {
  new (value: string | number, params?: ConverterConstructorOptions): IConverter;
  (value: string | number, params?: ConverterConstructorOptions): IConverter;
  readonly prototype: IConverter;
}

export type ConverterConstructorOptions = {
  sourceUnit?: Units<UnitScaleKey> | string;
  targetUnit?: Units<UnitScaleKey> | string;
  metric?: UnitScaleKey;
  precision?: number;
};
