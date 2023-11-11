import { ArgDefinition } from './types';

export class Superbytes {
  private _units: string[] = [];
  private _divider: number;
  private precision: number;

  protected _bytes: number;

  constructor(bytes: number, args: ArgDefinition) {
    this._bytes = Math.abs(bytes);
    this._units = args.system;
    this._divider = args.divider;
    this.precision = args.precision;
  }

  getValue(): string {
    if (Number.isFinite(this._bytes)) {
      return this._runWhenFinite(this._bytes, this.precision);
    } else {
      throw TypeError(`Bytes value is ${this._bytes}, must be: ${typeof this._bytes}`);
    }
  }

  protected _runWhenFinite(bytes: number, precision: number): string {
    if (bytes < this._divider) {
      return `${bytes} ${this._units[0]}`;
    } else {
      for (let i = 1; i <= this._units.length - 1; i++) {
        if (bytes >= Math.pow(this._divider, i) && bytes < Math.pow(this._divider, i + 1)) {
          const friendlyNumber = (bytes / Math.pow(this._divider, i)).toFixed(precision);
          return `${friendlyNumber} ${this._units[i]}`;
        }
      }
    }

    throw RangeError(
      `The number exceeds maximum value of convertible ${this._units[this._units.length - 1]} value`
    );
  }
}
