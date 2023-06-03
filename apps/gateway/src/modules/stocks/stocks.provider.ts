import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Stock } from '@app/common/interfaces';
import { Provider } from '@app/common/core';
import { APP } from '@app/common/consts';

const { STOCKS } = APP;

@Injectable()
export class StocksProvider extends Provider<Stock> {
  constructor(@Inject(STOCKS.SERVICE.SYMBOL) readonly client: ClientKafka) {
    super('stocks', client);
  }
}
