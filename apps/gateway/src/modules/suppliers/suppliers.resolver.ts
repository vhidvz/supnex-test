import {
  ClassSerializerInterceptor,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  TotalSerializer,
  SupplierSerializer,
  SuppliersSerializer,
} from '@app/common/serializers';
import { RateLimitInterceptor } from '@app/common/interceptors';
import {
  CountFilterDto,
  CreateSupplierDto,
  FilterDto,
  UniqueFilterDto,
  UpdateSupplierDto,
} from '@app/common/dto';
import { ParseMongoIdPipe, ValidationPipe } from '@app/common/pipes';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlInterceptor } from '@ntegral/nestjs-sentry';
import { AllExceptionsFilter } from '@app/common/filters';
import { Filter } from '@app/common/decorators';
import { toRaw } from '@app/common/utils';
import { lastValueFrom } from 'rxjs';

import { SuppliersProvider } from './suppliers.provider';

@UsePipes(ValidationPipe)
@UseFilters(AllExceptionsFilter)
@Resolver(() => SupplierSerializer)
@UseInterceptors(RateLimitInterceptor)
@UseInterceptors(
  ClassSerializerInterceptor,
  new GraphqlInterceptor({ version: true }),
)
export class SuppliersResolver {
  constructor(private readonly provider: SuppliersProvider) {}

  @Query(() => TotalSerializer)
  async countSupplier(
    @Filter() @Args('filter') filter: CountFilterDto,
  ): Promise<TotalSerializer> {
    return await lastValueFrom(this.provider.service.count(toRaw(filter)));
  }

  @Mutation(() => SupplierSerializer)
  async createSupplier(
    @Args('data', { type: () => CreateSupplierDto }) data: CreateSupplierDto,
  ): Promise<SupplierSerializer> {
    return await lastValueFrom(this.provider.service.create(data));
  }

  @Query(() => SuppliersSerializer)
  async findSuppliers(
    @Filter() @Args('filter') filter: FilterDto,
  ): Promise<SuppliersSerializer> {
    return await lastValueFrom(this.provider.service.find(toRaw(filter)));
  }

  @Query(() => SupplierSerializer)
  async findSupplier(
    @Args('id', ParseMongoIdPipe) id: string,
    @Filter() filter: Omit<UniqueFilterDto, 'id'>,
  ): Promise<SupplierSerializer> {
    Object.assign(filter, { id });
    return await lastValueFrom(this.provider.service.findById(toRaw(filter)));
  }

  @Mutation(() => SupplierSerializer)
  async updateSupplier(
    @Args('data') data: UpdateSupplierDto,
    @Args('id', ParseMongoIdPipe) id: string,
    @Filter() filter: Omit<UniqueFilterDto, 'id'>,
  ): Promise<SupplierSerializer> {
    Object.assign(filter, { id });
    return await lastValueFrom(
      this.provider.service.updateById({ data, filter: toRaw(filter) }),
    );
  }
}
