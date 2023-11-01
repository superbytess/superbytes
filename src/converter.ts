import {
  IConverter,
  UnitConversionResult,
  UnitScaleKey,
  Units,
  unitScale,
} from './types/converter-types';

export class Converter implements IConverter {
  constructor(
    private value: number,
    private fromUnit?: Units<UnitScaleKey>,
    private toUnit?: Units<UnitScaleKey>,
    private metric?: UnitScaleKey, // private precision: number = 2
    private precision: number = 2
  ) {
    return this;
  }

  private get targetUnit(): Units<UnitScaleKey> {
    return (
      this.toUnit ??
      this.findHighestUnitFromMetric(
        this.value,
        this.metric ?? this.findUnitBySymbol(this.sourceUnit).metrics[0]
      )
    );
  }

  private get sourceUnit(): Units<UnitScaleKey> {
    return this.fromUnit ?? unitScale[Object.keys(unitScale)[0] as UnitScaleKey].units[0];
  }

  toString(): string {
    const firstUnit = unitScale[Object.keys(unitScale)[0] as UnitScaleKey].units[0];
    const result = this.convertToUnit(this.value, this.sourceUnit, this.targetUnit);
    return `${result.value.toFixed(result.unit == firstUnit ? 0 : this.precision)} ${result.unit}`;
  }

  valueOf(): number {
    const result = this.convertToUnit(this.value, this.sourceUnit, this.targetUnit);
    return Number(result.value.toFixed(this.precision));
  }

  from(sourceUnit: Units<UnitScaleKey>): IConverter {
    this.fromUnit = sourceUnit;
    return this;
  }

  to(targetUnit: Units<UnitScaleKey>): IConverter {
    this.toUnit = targetUnit;
    return this;
  }

  protected findHighestUnitFromMetric<TMetric extends UnitScaleKey>(
    value: number,
    metric: TMetric
  ): Units<TMetric> {
    if (value < 1) return unitScale[metric].units[0];
    const unitIndex = Math.floor(Math.log(value) / Math.log(unitScale[metric].multiplier));
    return unitScale[metric].units[unitIndex];
  }

  protected findUnitBySymbol<TMetric extends UnitScaleKey>(
    unitSymbol: Units<TMetric>
  ): { index: number; metrics: ReadonlyArray<UnitScaleKey> } {
    if (unitSymbol === 'B') return { index: 0, metrics: ['SI', 'IEC'] };
    for (const metric of Object.keys(unitScale) as UnitScaleKey[]) {
      const index = (unitScale[metric].units as ReadonlyArray<Units<typeof metric>>).indexOf(
        unitSymbol
      );
      if (index !== -1) return { index, metrics: [metric] };
    }
    return { index: -1, metrics: [] };
  }

  private convertToUnit<TSourceMetric extends UnitScaleKey, TDestMetric extends UnitScaleKey>(
    value: number,
    sourceUnit: Units<TSourceMetric>,
    destinationUnit: Units<TDestMetric>
  ): UnitConversionResult<TDestMetric> {
    if (value <= 0) {
      return {
        value: 0,
        unit: destinationUnit,
        metric: this.findUnitBySymbol(destinationUnit).metrics[0],
      };
    }

    if (sourceUnit === destinationUnit) {
      return {
        value,
        unit: destinationUnit,
        metric: this.findUnitBySymbol(destinationUnit).metrics[0],
      };
    }

    const [fromUnit, targetUnit] = [
      this.findUnitBySymbol(sourceUnit),
      this.findUnitBySymbol(destinationUnit),
    ];

    if (fromUnit.index === -1 || targetUnit.index === -1) {
      return { value: 0, unit: destinationUnit, metric: targetUnit.metrics[0] };
    }

    const fromValue =
      fromUnit.index != 0
        ? value * Math.pow(unitScale[fromUnit.metrics[0]].multiplier, fromUnit.index)
        : value;

    const targetValue =
      targetUnit.index != 0
        ? fromValue / Math.pow(unitScale[targetUnit.metrics[0]].multiplier, targetUnit.index)
        : fromValue;

    return {
      value: targetValue,
      unit: destinationUnit,
      metric: targetUnit.metrics[0],
    };
  }
}
