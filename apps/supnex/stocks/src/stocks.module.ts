import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

@Module({
  imports: [],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
