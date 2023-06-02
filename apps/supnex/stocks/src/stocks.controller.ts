import {
  ClassSerializerInterceptor,
  Controller,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CountFilterDto, FilterDto, UniqueFilterDto } from '@app/common/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { AllExceptionsFilter } from '@app/common/filters';
import { TotalSerializer } from '@app/common/serializers';
import { ValidationPipe } from '@app/common/pipes';
import { Filter } from '@app/common/decorators';

import { StockSerializer, StocksSerializer } from './serializers';
import { CreateStockDto, UpdateStockDto } from './dto';
import { StocksService } from './stocks.service';

@Controller()
@UsePipes(ValidationPipe)
@UseFilters(AllExceptionsFilter)
@UseInterceptors(
  ClassSerializerInterceptor,
  new SentryInterceptor({ version: true }),
)
export class StocksController {
  constructor(private readonly service: StocksService) {}

  @MessagePattern('stocks.count')
  async count(@Filter() filter: CountFilterDto): Promise<TotalSerializer> {
    return TotalSerializer.build(await this.service.count(filter));
  }

  @MessagePattern('stocks.create')
  async create(@Payload() data: CreateStockDto): Promise<StockSerializer> {
    return await this.service.create(data);
  }

  @MessagePattern('stocks.find')
  async find(@Filter() filter: FilterDto): Promise<StocksSerializer> {
    return { items: await this.service.find(filter) };
  }

  @MessagePattern('stocks.findById')
  async findById(@Filter() filter: UniqueFilterDto): Promise<StockSerializer> {
    return await this.service.findById(filter);
  }

  @MessagePattern('stocks.updateById')
  async updateById(
    @Payload() update: UpdateStockDto,
    @Filter() filter: UniqueFilterDto,
  ): Promise<StockSerializer> {
    return await this.service.updateById(filter, update);
  }
}
