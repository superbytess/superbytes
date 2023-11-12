import { ArgsFacade } from './args';
import { Superbytes } from './superbytes';
import { ArgObject, ArgDefinition } from './types';

export function superbytes(
  bytes: number,
  arg1?: boolean | number | undefined | ArgObject,
  arg2?: boolean | number | undefined
): string {
  const args: ArgDefinition = new ArgsFacade(arg1, arg2).getArgDefinition();
  return new Superbytes(bytes, args).getValue();
}
