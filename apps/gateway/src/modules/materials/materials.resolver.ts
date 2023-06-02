import {
  ClassSerializerInterceptor,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  TotalSerializer,
  MaterialSerializer,
  MaterialsSerializer,
} from '@app/common/serializers';
import { RateLimitInterceptor } from '@app/common/interceptors';
import {
  CountFilterDto,
  CreateMaterialDto,
  FilterDto,
  UniqueFilterDto,
  UpdateMaterialDto,
} from '@app/common/dto';
import { ParseMongoIdPipe, ValidationPipe } from '@app/common/pipes';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlInterceptor } from '@ntegral/nestjs-sentry';
import { AllExceptionsFilter } from '@app/common/filters';
import { Filter } from '@app/common/decorators';
import { toRaw } from '@app/common/utils';
import { Metadata } from '@grpc/grpc-js';
import { lastValueFrom } from 'rxjs';

import { MaterialsProvider } from './materials.provider';

@UsePipes(ValidationPipe)
@UseFilters(AllExceptionsFilter)
@Resolver(() => MaterialSerializer)
@UseInterceptors(RateLimitInterceptor)
@UseInterceptors(
  ClassSerializerInterceptor,
  new GraphqlInterceptor({ version: true }),
)
export class MaterialsResolver {
  constructor(private readonly provider: MaterialsProvider) {}

  @Query(() => TotalSerializer)
  async countMaterial(
    @Filter() @Args('filter') filter: CountFilterDto,
  ): Promise<TotalSerializer> {
    return await lastValueFrom(this.provider.service.count(toRaw(filter)));
  }

  @Mutation(() => MaterialSerializer)
  async createMaterial(
    @Args('data', { type: () => CreateMaterialDto }) data: CreateMaterialDto,
  ): Promise<MaterialSerializer> {
    return await lastValueFrom(this.provider.service.create(data));
  }

  @Query(() => MaterialsSerializer)
  async findMaterials(
    @Filter() @Args('filter') filter: FilterDto,
  ): Promise<MaterialsSerializer> {
    return await lastValueFrom(this.provider.service.find(toRaw(filter)));
  }

  @Query(() => MaterialSerializer)
  async findMaterial(
    @Args('id', ParseMongoIdPipe) id: string,
    @Filter() filter: Omit<UniqueFilterDto, 'id'>,
  ): Promise<MaterialSerializer> {
    Object.assign(filter, { id });
    return await lastValueFrom(this.provider.service.findById(toRaw(filter)));
  }

  @Mutation(() => MaterialSerializer)
  async updateMaterial(
    @Args('data') data: UpdateMaterialDto,
    @Args('id', ParseMongoIdPipe) id: string,
    @Filter() filter: Omit<UniqueFilterDto, 'id'>,
  ): Promise<MaterialSerializer> {
    Object.assign(filter, { id });
    return await lastValueFrom(
      this.provider.service.updateById({ data, filter: toRaw(filter) }),
    );
  }
}
