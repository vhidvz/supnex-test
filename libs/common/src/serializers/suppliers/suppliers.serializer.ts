import { SupplierInterface } from '@app/common/interfaces';
import { Exclude, Expose, Type } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

import { SupplierSerializer } from './supplier.serializer';
import { ArraySerializer } from '../base';

@Exclude()
@ObjectType()
export class SuppliersSerializer implements ArraySerializer<SupplierInterface> {
  @Expose()
  @Type(() => SupplierSerializer)
  @Field(() => [SupplierSerializer])
  items: SupplierSerializer[];
}
