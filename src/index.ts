import { ArgsFacade } from './args.js';
import { Superbytes } from './superbytes.js';
import { ArgObject, ArgDefinition } from './types.js';

export function superbytes(
  bytes: number,
  arg1?: boolean | number | undefined | ArgObject,
  arg2?: boolean | number | undefined
): string {
  const args: ArgDefinition = new ArgsFacade(arg1, arg2).getArgDefinition();
  return new Superbytes(bytes, args).getValue();
}
