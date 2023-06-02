import { CountFilter, Query } from '@app/common/interfaces';
import { IsNotEmpty, IsObject } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { RawMethod } from '@app/common/classes';
import { Transform } from 'class-transformer';
import GraphQLJSON from 'graphql-type-json';
import { toJSON } from '@app/common/utils';

@InputType()
export class CountFilterDto<T = any>
  extends RawMethod
  implements CountFilter<T>
{
  @IsObject()
  @IsNotEmpty()
  @Field(() => GraphQLJSON)
  @Transform(({ value }) => toJSON(value))
  query: Query<T>;
}
