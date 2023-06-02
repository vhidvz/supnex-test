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

import { MaterialSerializer, MaterialsSerializer } from './serializers';
import { CreateMaterialDto, UpdateMaterialDto } from './dto';
import { MaterialsService } from './materials.service';

@GrpcService()
@UsePipes(ValidationPipe)
@UseFilters(AllExceptionsFilter)
@UseInterceptors(
  ClassSerializerInterceptor,
  new SentryInterceptor({ version: true }),
)
export class MaterialsController {
  constructor(private readonly service: MaterialsService) {}

  @GrpcMethod(MaterialsService.name)
  async count(@Filter() filter: CountFilterDto): Promise<TotalSerializer> {
    return TotalSerializer.build(await this.service.count(filter));
  }

  @GrpcMethod(MaterialsService.name)
  async create(@Body() data: CreateMaterialDto): Promise<MaterialSerializer> {
    return await this.service.create(data);
  }

  @GrpcMethod(MaterialsService.name)
  async find(@Filter() filter: FilterDto): Promise<MaterialsSerializer> {
    return { items: await this.service.find(filter) };
  }

  @GrpcMethod(MaterialsService.name)
  async findById(
    @Filter() filter: UniqueFilterDto,
  ): Promise<MaterialSerializer> {
    return await this.service.findById(filter);
  }

  @GrpcMethod(MaterialsService.name)
  async updateById(
    @Body() update: UpdateMaterialDto,
    @Filter() filter: UniqueFilterDto,
  ): Promise<MaterialSerializer> {
    return await this.service.updateById(filter, update);
  }
}
