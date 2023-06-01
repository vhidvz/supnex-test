import { Test, TestingModule } from '@nestjs/testing';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

describe('StocksController', () => {
  let stocksController: StocksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StocksController],
      providers: [StocksService],
    }).compile();

    stocksController = app.get<StocksController>(StocksController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(stocksController.getHello()).toBe('Hello World!');
    });
  });
});
