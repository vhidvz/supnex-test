import { StockInterface } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';
import { ObjectType } from '@nestjs/graphql';

import { Serializer } from '../base';

@Exclude()
@ObjectType()
export class StockSerializer
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
