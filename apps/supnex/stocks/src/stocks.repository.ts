import { StockInterface } from '@app/common/interfaces';
import { StockDocument } from '@app/common/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from '@app/common/core';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Stock } from './schema';

@Injectable()
export class StocksRepository extends Repository<StockInterface> {
  constructor(@InjectModel(Stock.name) readonly model: Model<StockDocument>) {
    super(model);
  }
}
