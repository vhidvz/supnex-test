import { Exclude, Expose, Type } from 'class-transformer';
import { StockInterface } from '@app/common/interfaces';
import { Field, ObjectType } from '@nestjs/graphql';

import { StockSerializer } from './stock.serializer';
import { ArraySerializer } from '../base';

@Exclude()
@ObjectType()
export class StocksSerializer implements ArraySerializer<StockInterface> {
  @Expose()
  @Type(() => StockSerializer)
  @Field(() => [StockSerializer])
  items: StockSerializer[];
}
