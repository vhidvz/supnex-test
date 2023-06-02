import { SupplierInterface } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';
import { ObjectType } from '@nestjs/graphql';

import { Serializer } from '../base';

@Exclude()
@ObjectType()
export class SupplierSerializer
  extends Serializer<SupplierInterface>
  implements SupplierInterface
{
  @Expose()
  name: string;
}
