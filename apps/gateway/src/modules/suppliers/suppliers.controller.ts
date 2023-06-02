import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  SupplierSerializer,
  SuppliersSerializer,
  TotalSerializer,
} from '@app/common/serializers';
import {
  CountFilterDto,
  CreateSupplierDto,
  FilterDto,
  UniqueFilterDto,
  UpdateSupplierDto,
} from '@app/common/dto';
import { ApiParam, ApiQuery, ApiTags, OmitType } from '@nestjs/swagger';
import { ParseMongoIdPipe, ValidationPipe } from '@app/common/pipes';
import { RateLimitInterceptor } from '@app/common/interceptors';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { AllExceptionsFilter } from '@app/common/filters';
import { Filter } from '@app/common/decorators';
import { toRaw } from '@app/common/utils';
import { lastValueFrom } from 'rxjs';

import { SuppliersProvider } from './suppliers.provider';

@ApiTags('suppliers')
@Controller('suppliers')
@UsePipes(ValidationPipe)
@UseFilters(AllExceptionsFilter)
@UseInterceptors(RateLimitInterceptor)
@UseInterceptors(
  ClassSerializerInterceptor,
  new SentryInterceptor({ version: true }),
)
export class SuppliersController {
  constructor(private readonly provider: SuppliersProvider) {}

  @Get('count')
  @ApiQuery({ type: CountFilterDto, required: false })
  async count(@Filter() filter: CountFilterDto): Promise<TotalSerializer> {
    return await lastValueFrom(this.provider.service.count(toRaw(filter)));
  }

  @Post()
  async create(@Body() data: CreateSupplierDto): Promise<SupplierSerializer> {
    return await lastValueFrom(this.provider.service.create(data));
  }

  @Get()
  @ApiQuery({ type: FilterDto, required: false })
  async findMany(@Filter() filter: FilterDto): Promise<SuppliersSerializer> {
    return await lastValueFrom(this.provider.service.find(toRaw(filter)));
  }

  @Get(':id')
  @ApiParam({ type: String, name: 'id', required: true })
  @ApiQuery({ type: OmitType(UniqueFilterDto, ['id']), required: false })
  async findById(
    @Filter() filter: UniqueFilterDto,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<SupplierSerializer> {
    Object.assign(filter, { id });
    return await lastValueFrom(this.provider.service.findById(toRaw(filter)));
  }

  @Patch(':id')
  @ApiParam({ type: String, name: 'id', required: true })
  @ApiQuery({ type: OmitType(UniqueFilterDto, ['id']), required: false })
  async updateById(
    @Body() data: UpdateSupplierDto,
    @Filter() filter: UniqueFilterDto,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<SupplierSerializer> {
    Object.assign(filter, { id });
    return await lastValueFrom(
      this.provider.service.updateById({ data, filter: toRaw(filter) }),
    );
  }
}
