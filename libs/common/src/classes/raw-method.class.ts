import { RawMethodInterface } from '@app/common/interfaces';
import { toRaw } from '@app/common/utils';

export class RawMethod implements RawMethodInterface {
  raw?() {
    return toRaw(this);
  }
}
