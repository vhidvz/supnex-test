import { IsMongoId, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { Projection, UniqueFilter } from '@app/common/interfaces';
import { Field, InputType } from '@nestjs/graphql';
import { RawMethod } from 'libs/common/classes';
import { Transform } from 'class-transformer';
import GraphQLJSON from 'graphql-type-json';
import { toJSON } from '@app/common/utils';

@InputType()
export class UniqueFilterDto<T = any>
  extends RawMethod
  implements UniqueFilter<T>
{
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON)
  @Transform(({ value }) => toJSON(value))
  projection?: Projection<T>;
}
