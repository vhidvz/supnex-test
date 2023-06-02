import { ProductInterface } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';
import { Category } from '@app/common/enums';

import { Serializer } from '../base';

@Exclude()
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
