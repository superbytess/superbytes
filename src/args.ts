import {
  ArgTypes,
  ArgObject,
  ArgDefinition,
  divider,
  iecUnits,
  siUnits,
  objectArgs,
  Metric,
  Arg,
} from './types';

abstract class Args {
  protected _arg1!: ArgTypes | ArgObject;
  protected _arg2!: ArgTypes;

  constructor(arg1?: ArgTypes | ArgObject, arg2?: ArgTypes) {
    this._arg1 = arg1;
    this._arg2 = arg2;
  }

  protected getDefaultArgs(digits = 2): ArgDefinition {
    return {
      divider: divider.iec,
      system: iecUnits,
      precision: digits,
    };
  }

  protected getSystemArgsByBoolean(booleanArg: boolean): Pick<ArgDefinition, 'system' | 'divider'> {
    return booleanArg
      ? { system: siUnits, divider: divider.si }
      : { system: iecUnits, divider: divider.iec };
  }

  protected getPrecisionArgsByNumber(numberArg: number): Pick<ArgDefinition, 'precision'> {
    return {
      precision: typeof numberArg === 'number' && !Number.isNaN(numberArg) ? numberArg : 2,
    };
  }
}

class LegacyArgs extends Args implements Arg {
  private _passedArgs!: Partial<ArgDefinition>;

  getArgDefinition(): ArgDefinition {
    if (this._arg1 === undefined && this._arg2 === undefined) {
      return this.getDefaultArgs();
    }

    this._argProceess(this._arg1 as ArgTypes);
    this._argProceess(this._arg2);
    return this._verifyPassedArgs(this._passedArgs);
  }

  private addToPassedArgs(args: Partial<ArgDefinition>): void {
    this._passedArgs = {
      ...this._passedArgs,
      ...args,
    };
  }

  private _argProceess<T extends ArgTypes>(inputArg: T): void {
    switch (typeof inputArg) {
      case 'boolean':
        this.addToPassedArgs(this.getSystemArgsByBoolean(inputArg as boolean));
        break;
      case 'number':
        this.addToPassedArgs(this.getPrecisionArgsByNumber(inputArg as number));
        break;
    }
  }

  private _verifyPassedArgs(partialArgs: Partial<ArgDefinition>): ArgDefinition {
    const defaultKeys = Object.keys(this.getDefaultArgs());
    const missingKeys = defaultKeys.filter((item) => {
      return !Object.keys(partialArgs).includes(item);
    });

    const allDefaultArgs: Array<{ name: string; object: Partial<ArgDefinition> }> = Object.entries(
      this.getDefaultArgs()
    ).map(([k, v]) => ({
      name: k,
      object: { [k]: v },
    }));

    let verifiedArgs!: ArgDefinition;

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

class ObjectArgs extends Args implements Arg {
  getArgDefinition(): ArgDefinition {
    if (Object.keys(this._arg1 as ArgObject).length == 0) {
      return this.getDefaultArgs();
    } else {
      return this._prepareExistingArgs(this._arg1 as ArgObject);
    }
  }

  private _prepareExistingArgs(arg: ArgObject): ArgDefinition {
    const existingKeys = this._getExistingKeys(arg);
    const universalArgsObject = this.getDefaultArgs();
    existingKeys.forEach((item) => {
      if (item === 'metric' && this._validateMetrics(arg.metric)) {
        const pickedSystemAndDivider = this.getSystemArgsByBoolean(
          objectArgs.map[arg.metric as Metric]
        );

        universalArgsObject.divider = pickedSystemAndDivider.divider;
        universalArgsObject.system = pickedSystemAndDivider.system;
      }

      if (item === 'digits') {
        universalArgsObject.precision = this.getPrecisionArgsByNumber(
          arg.digits as number
        ).precision;
      }

      if (item === 'precision') {
        universalArgsObject.precision = this.getPrecisionArgsByNumber(
          arg.precision as number
        ).precision;
      }
    });

    return universalArgsObject;
  }

  private _getExistingKeys(arg: ArgObject): string[] {
    return Object.keys(arg).filter((item) => {
      return objectArgs.keys.includes(item);
    });
  }

  private _validateMetrics(metric: string | undefined): boolean {
    if (metric === undefined) {
      return false;
    } else {
      return objectArgs.metric.includes(metric);
    }
  }
}

export class ArgsFacade extends Args implements Arg {
  getArgDefinition(): ArgDefinition {
    if (typeof this._arg1 === 'object') {
      return new ObjectArgs(this._arg1).getArgDefinition();
    } else {
      return new LegacyArgs(this._arg1 as ArgTypes, this._arg2).getArgDefinition();
    }
  }
}
