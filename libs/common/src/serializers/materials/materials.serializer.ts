import { MaterialInterface } from '@app/common/interfaces';
import { Exclude, Expose, Type } from 'class-transformer';

import { MaterialSerializer } from './material.serializer';
import { ArraySerializer } from '../base';

@Exclude()
export class MaterialsSerializer implements ArraySerializer<MaterialInterface> {
  @Expose()
  @Type(() => MaterialSerializer)
  items: MaterialSerializer[];
}
