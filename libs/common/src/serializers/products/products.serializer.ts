import { ProductInterface } from '@app/common/interfaces';
import { Exclude, Expose, Type } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

import { ProductSerializer } from './product.serializer';
import { ArraySerializer } from '../base';

@Exclude()
@ObjectType()
export class ProductsSerializer implements ArraySerializer<ProductInterface> {
  @Expose()
  @Type(() => ProductSerializer)
  @Field(() => [ProductSerializer])
  items: ProductSerializer[];
}
