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
  ProductSerializer,
  ProductsSerializer,
  TotalSerializer,
} from '@app/common/serializers';
import {
  CountFilterDto,
  CreateProductDto,
  FilterDto,
  UniqueFilterDto,
  UpdateProductDto,
} from '@app/common/dto';
import { ApiParam, ApiQuery, ApiTags, OmitType } from '@nestjs/swagger';
import { ParseMongoIdPipe, ValidationPipe } from '@app/common/pipes';
import { RateLimitInterceptor } from '@app/common/interceptors';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { AllExceptionsFilter } from '@app/common/filters';
import { Filter } from '@app/common/decorators';
import { lastValueFrom, map } from 'rxjs';
import { toRaw } from '@app/common/utils';

import { ProductsProvider } from './products.provider';

@ApiTags('products')
@Controller('products')
@UsePipes(ValidationPipe)
@UseFilters(AllExceptionsFilter)
@UseInterceptors(RateLimitInterceptor)
@UseInterceptors(
  ClassSerializerInterceptor,
  new SentryInterceptor({ version: true }),
)
export class ProductsController {
  constructor(private readonly provider: ProductsProvider) {}

  @Get('count')
  @ApiQuery({ type: CountFilterDto, required: false })
  async count(@Filter() filter: CountFilterDto): Promise<TotalSerializer> {
    return await lastValueFrom(
      this.provider.service
        .count(toRaw(filter))
        .pipe(map((res) => ({ count: Number(res.count) }))),
    );
  }

  @Post()
  async create(@Body() data: CreateProductDto): Promise<ProductSerializer> {
    return await lastValueFrom(
      this.provider.service
        .create(data)
        .pipe(map((res) => ({ ...res, price: Number(res.price) }))),
    );
  }

  @Get()
  @ApiQuery({ type: FilterDto, required: false })
  async find(@Filter() filter: FilterDto): Promise<ProductsSerializer> {
    return await lastValueFrom(
      this.provider.service.find(toRaw(filter)).pipe(
        map((res) => ({
          items: res.items.map((item) => ({
            ...item,
            price: Number(item.price),
          })),
        })),
      ),
    );
  }

  @Get(':id')
  @ApiParam({ type: String, name: 'id', required: true })
  @ApiQuery({ type: OmitType(UniqueFilterDto, ['id']), required: false })
  async findById(
    @Filter() filter: UniqueFilterDto,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<ProductSerializer> {
    Object.assign(filter, { id });
    return await lastValueFrom(
      this.provider.service
        .findById(toRaw(filter))
        .pipe(map((res) => ({ ...res, price: Number(res.price) }))),
    );
  }

  @Patch(':id')
  @ApiParam({ type: String, name: 'id', required: true })
  @ApiQuery({ type: OmitType(UniqueFilterDto, ['id']), required: false })
  async updateById(
    @Body() data: UpdateProductDto,
    @Filter() filter: UniqueFilterDto,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<ProductSerializer> {
    Object.assign(filter, { id });
    return await lastValueFrom(
      this.provider.service
        .updateById({ data, filter: toRaw(filter) })
        .pipe(map((res) => ({ ...res, price: Number(res.price) }))),
    );
  }
}
