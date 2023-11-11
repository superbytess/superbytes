import { ArgsFacade } from './args';
import { Superbytes } from './superbytes';
import { ArgObject, ArgDefinition } from './types';

export function superbytes<
  T extends boolean | number | undefined | ArgObject,
  K extends boolean | number | undefined,
>(bytes: number, arg1?: T, arg2?: K): string {
  const args: ArgDefinition = new ArgsFacade(arg1, arg2).getArgDefinition();
  return new Superbytes(bytes, args).getValue();
}
