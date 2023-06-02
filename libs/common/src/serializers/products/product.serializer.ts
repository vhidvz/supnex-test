import { ProductInterface } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';
import { ObjectType } from '@nestjs/graphql';
import { Category } from '@app/common/enums';

import { Serializer } from '../base';

@Exclude()
@ObjectType()
export class ProductSerializer
  extends Serializer<ProductInterface>
  implements ProductInterface
{
  @Expose()
  supplier_id: string;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  category: Category;
}
