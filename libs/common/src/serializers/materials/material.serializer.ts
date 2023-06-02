import { MaterialInterface, Measurement } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';
import { Category } from '@app/common/enums';

import { Serializer } from '../base';

@Exclude()
export class Material
  extends Serializer<MaterialInterface>
  implements MaterialInterface
{
  @Expose()
  name: string;

  @Expose()
  category: Category;

  @Expose()
  measurement: Measurement;
}
