import {
  Body,
  ClassSerializerInterceptor,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CountFilterDto, FilterDto, UniqueFilterDto } from '@app/common/dto';
import { GrpcMethod, GrpcService } from '@nestjs/microservices';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { AllExceptionsFilter } from '@app/common/filters';
import { TotalSerializer } from '@app/common/serializers';
import { Filter } from '@app/common/decorators';

import { ProductSerializer, ProductsSerializer } from './serializers';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductsService } from './products.service';

@GrpcService()
@UsePipes(ValidationPipe)
@UseFilters(AllExceptionsFilter)
@UseInterceptors(
  ClassSerializerInterceptor,
  new SentryInterceptor({ version: true }),
)
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @GrpcMethod(ProductsService.name)
  async count(@Filter() filter: CountFilterDto): Promise<TotalSerializer> {
    return TotalSerializer.build(await this.service.count(filter));
  }

  @GrpcMethod(ProductsService.name)
  async create(@Body() data: CreateProductDto): Promise<ProductSerializer> {
    return await this.service.create(data);
  }

  @GrpcMethod(ProductsService.name)
  async find(@Filter() filter: FilterDto): Promise<ProductsSerializer> {
    return { items: await this.service.find(filter) };
  }

  @GrpcMethod(ProductsService.name)
  async findById(
    @Filter() filter: UniqueFilterDto,
  ): Promise<ProductSerializer> {
    return await this.service.findById(filter);
  }

  @GrpcMethod(ProductsService.name)
  async updateById(
    @Body() update: UpdateProductDto,
    @Filter() filter: UniqueFilterDto,
  ): Promise<ProductSerializer> {
    return await this.service.updateById(filter, update);
  }
}
