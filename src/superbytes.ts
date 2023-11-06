import { ArgDefinition } from './types';

export class Superbytes {
  private _units: string[] = [];
  private _divider: number;
  private _digits: number;

  protected _args: ArgDefinition;
  protected _bytes: number;

  constructor(bytes: number, args: ArgDefinition) {
    this._args = args;
    this._bytes = bytes;
    this._units = args.system;
    this._divider = args.divider;
    this._digits = args.digits;
    return this;
  }

  getValue(): string {
    const bytes = Math.abs(this._bytes);
    if (Number.isFinite(bytes)) {
      return this._runWhenFinite(bytes, this._digits);
    } else {
      return '0 B';
    }
  }

  private _runWhenFinite(bytes: number, digits: number): string {
    if (bytes < this._divider) {
      return `${bytes} ${this._units[0]}`;
    } else {
      for (let i = 1; i <= this._units.length - 1; i++) {
        if (bytes >= Math.pow(this._divider, i) && bytes < Math.pow(this._divider, i + 1)) {
          const num = (bytes / Math.pow(this._divider, i)).toFixed(digits);
          return `${num} ${this._units[i]}`;
        }
      }
    }

    return '0 B';
  }
}
