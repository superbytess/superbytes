import { Metric, UnitScaleKey, Units, metrics, unitScale } from '../types/converter-types';

export class ConverterHelper {
  static isValidMetric(metric: unknown): metric is Metric {
    return typeof metric === 'string' && metrics.includes(metric as Metric);
  }

  static isValidUnitScaleKey(key: unknown): key is UnitScaleKey {
    return (
      typeof key === 'string' && this.isValidMetric(key) && Object.keys(unitScale).includes(key)
    );
  }

  static isValidUnit<TScale extends UnitScaleKey>(
    unit: unknown,
    scale?: TScale
  ): unit is Units<TScale> {
    return typeof scale === 'undefined'
      ? Object.keys(unitScale).some((key) => this.isValidUnit(unit, key as TScale))
      : ConverterHelper.isValidUnitScaleKey(scale) &&
          typeof unit === 'string' &&
          (unitScale[scale].units as ReadonlyArray<string>).includes(unit);
  }
}
