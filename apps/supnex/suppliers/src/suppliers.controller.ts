import {
  Body,
  ClassSerializerInterceptor,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CountFilterDto, FilterDto, UniqueFilterDto } from '@app/common/dto';
import { GrpcMethod, GrpcService } from '@nestjs/microservices';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { AllExceptionsFilter } from '@app/common/filters';
import { TotalSerializer } from '@app/common/serializers';
import { ValidationPipe } from '@app/common/pipes';
import { Filter } from '@app/common/decorators';

import { SupplierSerializer, SuppliersSerializer } from './serializers';
import { CreateSupplierDto, UpdateSupplierDto } from './dto';
import { SuppliersService } from './suppliers.service';

@GrpcService()
@UsePipes(ValidationPipe)
@UseFilters(AllExceptionsFilter)
@UseInterceptors(
  ClassSerializerInterceptor,
  new SentryInterceptor({ version: true }),
)
export class SuppliersController {
  constructor(private readonly service: SuppliersService) {}

  @GrpcMethod(SuppliersService.name)
  async count(@Filter() filter: CountFilterDto): Promise<TotalSerializer> {
    return TotalSerializer.build(await this.service.count(filter));
  }

  @GrpcMethod(SuppliersService.name)
  async create(@Body() data: CreateSupplierDto): Promise<SupplierSerializer> {
    return await this.service.create(data);
  }

  @GrpcMethod(SuppliersService.name)
  async find(@Filter() filter: FilterDto): Promise<SuppliersSerializer> {
    return { items: await this.service.find(filter) };
  }

  @GrpcMethod(SuppliersService.name)
  async findById(
    @Filter() filter: UniqueFilterDto,
  ): Promise<SupplierSerializer> {
    return await this.service.findById(filter);
  }

  @GrpcMethod(SuppliersService.name)
  async updateById(
    @Body() update: UpdateSupplierDto,
    @Filter() filter: UniqueFilterDto,
  ): Promise<SupplierSerializer> {
    return await this.service.updateById(filter, update);
  }
}
