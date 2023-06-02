import { StockInterface } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';

import { Serializer } from '../base';

@Exclude()
export class Stock
  extends Serializer<StockInterface>
  implements StockInterface
{
  @Expose()
  product_id: string;

  @Expose()
  material_id: string;

  @Expose()
  amount: number;
}
