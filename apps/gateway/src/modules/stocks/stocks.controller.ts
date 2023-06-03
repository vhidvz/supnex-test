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
  StockSerializer,
  StocksSerializer,
  TotalSerializer,
} from '@app/common/serializers';
import {
  CountFilterDto,
  CreateStockDto,
  FilterDto,
  UniqueFilterDto,
  UpdateStockDto,
} from '@app/common/dto';
import { ApiParam, ApiQuery, ApiTags, OmitType } from '@nestjs/swagger';
import { ParseMongoIdPipe, ValidationPipe } from '@app/common/pipes';
import { RateLimitInterceptor } from '@app/common/interceptors';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { AllExceptionsFilter } from '@app/common/filters';
import { Filter } from '@app/common/decorators';
import { toRaw } from '@app/common/utils';
import { lastValueFrom } from 'rxjs';

import { StocksProvider } from './stocks.provider';

@ApiTags('stocks')
@Controller('stocks')
@UsePipes(ValidationPipe)
@UseFilters(AllExceptionsFilter)
@UseInterceptors(RateLimitInterceptor)
@UseInterceptors(
  ClassSerializerInterceptor,
  new SentryInterceptor({ version: true }),
)
export class StocksController {
  constructor(private readonly provider: StocksProvider) {}

  @Get('count')
  @ApiQuery({ type: CountFilterDto, required: false })
  async count(@Filter() filter: CountFilterDto): Promise<TotalSerializer> {
    return (await lastValueFrom(this.provider.count(toRaw(filter)))).value;
  }

  @Post()
  async create(@Body() data: CreateStockDto): Promise<StockSerializer> {
    return (await lastValueFrom(this.provider.create(data))).value;
  }

  @Get()
  @ApiQuery({ type: FilterDto, required: false })
  async find(@Filter() filter: FilterDto): Promise<StocksSerializer> {
    return {
      items: (await lastValueFrom(this.provider.find(toRaw(filter)))).value,
    };
  }

  @Get(':id')
  @ApiParam({ type: String, name: 'id', required: true })
  @ApiQuery({ type: OmitType(UniqueFilterDto, ['id']), required: false })
  async findById(
    @Filter() filter: UniqueFilterDto,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<StockSerializer> {
    Object.assign(filter, { id });
    return (await lastValueFrom(this.provider.findById(toRaw(filter)))).value;
  }

  @Patch(':id')
  @ApiParam({ type: String, name: 'id', required: true })
  @ApiQuery({ type: OmitType(UniqueFilterDto, ['id']), required: false })
  async updateById(
    @Body() data: UpdateStockDto,
    @Filter() filter: UniqueFilterDto,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<StockSerializer> {
    Object.assign(filter, { id });
    return (await lastValueFrom(this.provider.updateById(data, toRaw(filter))))
      .value;
  }
}
