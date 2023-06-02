import { StockInterface } from '@app/common/interfaces';
import { Exclude, Expose, Type } from 'class-transformer';

import { StockSerializer } from './stock.serializer';
import { ArraySerializer } from '../base';

@Exclude()
export class StocksSerializer implements ArraySerializer<StockInterface> {
  @Expose()
  @Type(() => StockSerializer)
  items: StockSerializer[];
}
