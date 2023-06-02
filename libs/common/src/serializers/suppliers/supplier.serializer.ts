import { SupplierInterface } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';

import { Serializer } from '../base';

@Exclude()
export class SupplierSerializer
  extends Serializer<SupplierInterface>
  implements SupplierInterface
{
  @Expose()
  name: string;
}
