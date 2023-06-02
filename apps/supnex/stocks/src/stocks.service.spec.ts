/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

import { Stock, StockSchema } from '@app/common/schemas';
import { Test, TestingModule } from '@nestjs/testing';
import { MONGO_CONFIG } from '@app/common/configs';
import { MongooseModule } from '@nestjs/mongoose';

import { StocksRepository } from './stocks.repository';
import { StocksService } from './stocks.service';

describe('StocksService', () => {
  let stocksService: StocksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(MONGO_CONFIG()),
        MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
      ],
      providers: [StocksService, StocksRepository],
    }).compile();

    stocksService = app.get<StocksService>(StocksService);
  });

  describe('services', () => {
    it('should return total number of stocks', async () => {
      expect(await stocksService.count({ query: {} })).toBeGreaterThan(0);
    });
  });
});
