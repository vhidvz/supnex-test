import { StockInterface } from '@app/common/interfaces';
import { Injectable } from '@nestjs/common';
import { Service } from '@app/common/core';

import { StocksRepository } from './stocks.repository';

@Injectable()
export class StocksService extends Service<StockInterface> {
  constructor(repository: StocksRepository) {
    super(repository);
  }
}
