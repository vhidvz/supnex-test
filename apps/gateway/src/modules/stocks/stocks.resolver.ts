import {
  ClassSerializerInterceptor,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  TotalSerializer,
  StockSerializer,
  StocksSerializer,
} from '@app/common/serializers';
import { RateLimitInterceptor } from '@app/common/interceptors';
import {
  CountFilterDto,
  CreateStockDto,
  FilterDto,
  UniqueFilterDto,
  UpdateStockDto,
} from '@app/common/dto';
import { ParseMongoIdPipe, ValidationPipe } from '@app/common/pipes';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlInterceptor } from '@ntegral/nestjs-sentry';
import { AllExceptionsFilter } from '@app/common/filters';
import { Filter } from '@app/common/decorators';
import { toRaw } from '@app/common/utils';
import { lastValueFrom } from 'rxjs';

import { StocksProvider } from './stocks.provider';

@UsePipes(ValidationPipe)
@UseFilters(AllExceptionsFilter)
@Resolver(() => StockSerializer)
@UseInterceptors(RateLimitInterceptor)
@UseInterceptors(
  ClassSerializerInterceptor,
  new GraphqlInterceptor({ version: true }),
)
export class StocksResolver {
  constructor(private readonly provider: StocksProvider) {}

  @Query(() => TotalSerializer)
  async countStock(
    @Filter() @Args('filter') filter: CountFilterDto,
  ): Promise<TotalSerializer> {
    return (await lastValueFrom(this.provider.count(toRaw(filter)))).value;
  }

  @Mutation(() => StockSerializer)
  async createStock(
    @Args('data', { type: () => CreateStockDto }) data: CreateStockDto,
  ): Promise<StockSerializer> {
    return (await lastValueFrom(this.provider.create(data))).value;
  }

  @Query(() => StocksSerializer)
  async findStocks(
    @Filter() @Args('filter') filter: FilterDto,
  ): Promise<StocksSerializer> {
    return {
      items: (await lastValueFrom(this.provider.find(toRaw(filter)))).value,
    };
  }

  @Query(() => StockSerializer)
  async findStock(
    @Args('id', ParseMongoIdPipe) id: string,
    @Filter() filter: Omit<UniqueFilterDto, 'id'>,
  ): Promise<StockSerializer> {
    Object.assign(filter, { id });
    return (await lastValueFrom(this.provider.findById(toRaw(filter)))).value;
  }

  @Mutation(() => StockSerializer)
  async updateStock(
    @Args('data') data: UpdateStockDto,
    @Args('id', ParseMongoIdPipe) id: string,
    @Filter() filter: Omit<UniqueFilterDto, 'id'>,
  ): Promise<StockSerializer> {
    Object.assign(filter, { id });
    return (await lastValueFrom(this.provider.updateById(data, toRaw(filter))))
      .value;
  }
}
