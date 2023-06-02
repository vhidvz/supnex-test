import {
  ClassSerializerInterceptor,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  TotalSerializer,
  ProductSerializer,
  ProductsSerializer,
} from '@app/common/serializers';
import { RateLimitInterceptor } from '@app/common/interceptors';
import {
  CountFilterDto,
  CreateProductDto,
  FilterDto,
  UniqueFilterDto,
  UpdateProductDto,
} from '@app/common/dto';
import { ParseMongoIdPipe, ValidationPipe } from '@app/common/pipes';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlInterceptor } from '@ntegral/nestjs-sentry';
import { AllExceptionsFilter } from '@app/common/filters';
import { Filter } from '@app/common/decorators';
import { toRaw } from '@app/common/utils';
import { lastValueFrom } from 'rxjs';

import { ProductsProvider } from './products.provider';

@UsePipes(ValidationPipe)
@UseFilters(AllExceptionsFilter)
@Resolver(() => ProductSerializer)
@UseInterceptors(RateLimitInterceptor)
@UseInterceptors(
  ClassSerializerInterceptor,
  new GraphqlInterceptor({ version: true }),
)
export class ProductsResolver {
  constructor(private readonly provider: ProductsProvider) {}

  @Query(() => TotalSerializer)
  async countProduct(
    @Filter() @Args('filter') filter: CountFilterDto,
  ): Promise<TotalSerializer> {
    return await lastValueFrom(this.provider.service.count(toRaw(filter)));
  }

  @Mutation(() => ProductSerializer)
  async createProduct(
    @Args('data', { type: () => CreateProductDto }) data: CreateProductDto,
  ): Promise<ProductSerializer> {
    return await lastValueFrom(this.provider.service.create(data));
  }

  @Query(() => ProductsSerializer)
  async findProducts(
    @Filter() @Args('filter') filter: FilterDto,
  ): Promise<ProductsSerializer> {
    return await lastValueFrom(this.provider.service.find(toRaw(filter)));
  }

  @Query(() => ProductSerializer)
  async findProduct(
    @Args('id', ParseMongoIdPipe) id: string,
    @Filter() filter: Omit<UniqueFilterDto, 'id'>,
  ): Promise<ProductSerializer> {
    Object.assign(filter, { id });
    return await lastValueFrom(this.provider.service.findById(toRaw(filter)));
  }

  @Mutation(() => ProductSerializer)
  async updateProduct(
    @Args('data') data: UpdateProductDto,
    @Args('id', ParseMongoIdPipe) id: string,
    @Filter() filter: Omit<UniqueFilterDto, 'id'>,
  ): Promise<ProductSerializer> {
    Object.assign(filter, { id });
    return await lastValueFrom(
      this.provider.service.updateById({ data, filter: toRaw(filter) }),
    );
  }
}
