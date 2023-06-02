import { MaterialInterface } from '@app/common/interfaces';
import { Exclude, Expose, Type } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

import { MaterialSerializer } from './material.serializer';
import { ArraySerializer } from '../base';

@Exclude()
@ObjectType()
export class MaterialsSerializer implements ArraySerializer<MaterialInterface> {
  @Expose()
  @Type(() => MaterialSerializer)
  @Field(() => [MaterialSerializer])
  items: MaterialSerializer[];
}
