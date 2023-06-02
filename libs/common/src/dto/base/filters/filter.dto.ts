import { Filter, Pagination, Projection, Query } from '@app/common/interfaces';
import { IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { RawMethod } from '@app/common/classes';
import { Transform } from 'class-transformer';
import GraphQLJSON from 'graphql-type-json';
import { toJSON } from '@app/common/utils';

@InputType()
export class FilterDto<T = any> extends RawMethod implements Filter<T> {
  @IsObject()
  @IsNotEmpty()
  @Field(() => GraphQLJSON)
  @Transform(({ value }) => toJSON(value))
  query: Query<T>;

  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON)
  @Transform(({ value }) => toJSON(value))
  projection?: Projection<T>;

  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON)
  @Transform(({ value }) => toJSON(value))
  pagination?: Pagination<T>;
}
