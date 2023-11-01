import { ConverterHelper } from '../../src/helpers/converter-helper.helper';
import { Metric, UnitScale, Units, metrics, unitScale } from '../../src/types/converter-types';

describe('ConverterHelper Class', () => {
  test('isValidMetric', () => {
    const everyMetric = metrics.every((item) => {
      return ConverterHelper.isValidMetric(item);
    });

    expect(everyMetric).toBeTruthy();
    expect(ConverterHelper.isValidMetric('foo')).toBeFalsy();
  });

  test('isValidUnitScaleKey', () => {
    const everyMetric = metrics.every((item) => {
      return ConverterHelper.isValidUnitScaleKey(item);
    });

    expect(everyMetric).toBeTruthy();
    expect(ConverterHelper.isValidUnitScaleKey('bar')).toBeFalsy();
  });

  test('isValidUnit', () => {
    const everyUnit = metrics.every((metric) => {
      return unitScale[metric].units.every((unit) => {
        return ConverterHelper.isValidUnit(unit);
      })
    });

    expect(everyUnit).toBeTruthy();
    expect(ConverterHelper.isValidUnit('baz')).toBeFalsy();

    const everyUnitAndScale = metrics.every((metric) => {
      return unitScale[metric].units.every((unit) => {
        return ConverterHelper.isValidUnit(unit, metric);
      })
    });

    expect(everyUnitAndScale).toBeTruthy();
    expect(ConverterHelper.isValidUnit(unitScale.SI.units[2], 'SI')).toBeTruthy();
    expect(ConverterHelper.isValidUnit(unitScale.SI.units[2], 'IEC')).toBeFalsy();
    expect(ConverterHelper.isValidUnit(unitScale.SI.units[2], 'foo' as Metric)).toBeFalsy();
  });
});
