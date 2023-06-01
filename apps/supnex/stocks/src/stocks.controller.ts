import { Controller, Get } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller()
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  getHello(): string {
    return this.stocksService.getHello();
  }
}
