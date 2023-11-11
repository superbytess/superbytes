import { ArgsFacade } from '../src/args';
import { Superbytes } from '../src/superbytes';
import { ArgDefinition } from '../src/types';

describe('Superbytes class', () => {
  const args: ArgDefinition = new ArgsFacade({ precision: 3 }, undefined).getArgDefinition();

  test('TypeError throw', () => {
    expect(() => {
      new Superbytes(Infinity, args).getValue();
    }).toThrow(TypeError);

    expect(() => {
      new Superbytes(-Infinity, args).getValue();
    }).toThrow(TypeError);

    expect(() => {
      new Superbytes(NaN, args).getValue();
    }).toThrow(TypeError);
  });
});
