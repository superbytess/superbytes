import { Metric, defaultPrecision, metrics, unitScale } from '../types/converter-types';
import {
  SuperBytesArg,
  SuperBytesArgDefinition,
  SuperBytesOptions,
  objectArgs,
} from '../types/superbytes-types';

abstract class Args {
  protected _arg1!: SuperBytesArg | Partial<SuperBytesOptions>;
  protected _arg2!: SuperBytesArg;

  constructor(arg1?: SuperBytesArg | Partial<SuperBytesOptions>, arg2?: SuperBytesArg) {
    this._arg1 = arg1;
    this._arg2 = arg2;
  }

  protected getDefaultArgs(): SuperBytesArgDefinition {
    return {
      divider: unitScale.IEC.multiplier,
      units: (<unknown>unitScale.IEC.units) as string[],
      digits: defaultPrecision,
      metric: 'IEC',
    };
  }

  protected getSystemArgsByBoolean(
    booleanArg: boolean
  ): Pick<SuperBytesArgDefinition, 'units' | 'divider' | 'metric'> {
    return booleanArg
      ? {
          units: (<unknown>unitScale.SI.units) as string[],
          divider: unitScale.SI.multiplier,
          metric: 'SI',
        }
      : {
          units: (<unknown>unitScale.IEC.units) as string[],
          divider: unitScale.IEC.multiplier,
          metric: 'IEC',
        };
  }

  // protected getMetricArgsByBoolean(booleanArg: boolean): Pick<SuperBytesArgDefinition, 'metric'> {
  //   return booleanArg ? { metric: 'SI' } : { metric: 'IEC' };
  // }

  protected getDigitsArgsByNumber(numberArg: number): Pick<SuperBytesArgDefinition, 'digits'> {
    return {
      digits: typeof numberArg === 'number' && !Number.isNaN(numberArg) ? numberArg : 2,
    };
  }
}

class LegacyArgs extends Args {
  private _passedArgs!: Partial<SuperBytesArgDefinition>;

  prepareArgs(): SuperBytesArgDefinition {
    if (this._arg1 === undefined && this._arg2 === undefined) {
      return this.getDefaultArgs();
    }

    this._argProceess(this._arg1 as SuperBytesArg);
    this._argProceess(this._arg2);
    return this._verifyPassedArgs(this._passedArgs);
  }

  private addToPassedArgs(args: Partial<SuperBytesArgDefinition>): void {
    this._passedArgs = {
      ...this._passedArgs,
      ...args,
    };
  }

  private _argProceess<TSuperBytesArg extends SuperBytesArg>(inputArg: TSuperBytesArg): void {
    switch (typeof inputArg) {
      case 'boolean':
        this.addToPassedArgs(this.getSystemArgsByBoolean(inputArg as boolean));
        break;
      case 'number':
        this.addToPassedArgs(this.getDigitsArgsByNumber(inputArg as number));
        break;
    }
  }

  private _verifyPassedArgs(
    partialArgs: Partial<SuperBytesArgDefinition>
  ): SuperBytesArgDefinition {
    const defaultKeys = Object.keys(this.getDefaultArgs());
    const missingKeys = defaultKeys.filter((item) => {
      return !Object.keys(partialArgs).includes(item);
    });

    const allDefaultArgs: Array<{ name: string; object: Partial<SuperBytesArgDefinition> }> =
      Object.entries(this.getDefaultArgs()).map(([k, v]) => ({
        name: k,
        object: { [k]: v },
      }));

    let verifiedArgs!: SuperBytesArgDefinition;

    allDefaultArgs.forEach((item) => {
      if (missingKeys.includes(item.name)) {
        verifiedArgs = {
          ...verifiedArgs,
          ...item.object,
        };
      }
    });

    verifiedArgs = {
      ...verifiedArgs,
      ...partialArgs,
    };
    return verifiedArgs;
  }
}

class ObjectArgs extends Args {
  prepareArgs(): SuperBytesArgDefinition {
    if (Object.keys(this._arg1 as SuperBytesOptions).length == 0) {
      return this.getDefaultArgs();
    } else {
      return this._prepareExistingArgs(this._arg1 as SuperBytesOptions);
    }
  }

  private _prepareExistingArgs(arg: SuperBytesOptions): SuperBytesArgDefinition {
    const existingKeys = this._getExistingKeys(arg);
    const universalArgsObject = this.getDefaultArgs();
    existingKeys.forEach((item) => {
      if (item === 'metric' && this._validateMetrics(arg.metric)) {
        const pickedSystemAndDivider = this.getSystemArgsByBoolean(
          objectArgs.map[arg.metric as Metric]
        );

        universalArgsObject.divider = pickedSystemAndDivider.divider;
        universalArgsObject.units = pickedSystemAndDivider.units;
        universalArgsObject.metric = pickedSystemAndDivider.metric;
      }

      if (item === 'digits') {
        universalArgsObject.digits = this.getDigitsArgsByNumber(arg.digits as number).digits;
      }
    });

    return universalArgsObject;
  }

  private _getExistingKeys(arg: SuperBytesOptions): string[] {
    return Object.keys(arg).filter((item) => {
      return objectArgs.keys.includes(item);
    });
  }

  private _validateMetrics(metric: Metric): boolean {
    if (metric === undefined) {
      return false;
    } else {
      return metrics.includes(metric);
    }
  }
}

export class ArgsFacade extends Args {
  getArgsDefinition(): SuperBytesArgDefinition {
    if (typeof this._arg1 === 'object') {
      return new ObjectArgs(this._arg1).prepareArgs();
    } else {
      return new LegacyArgs(this._arg1 as SuperBytesArg, this._arg2).prepareArgs();
    }
  }
}
