import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { BaseInterface } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@InterfaceType()
export class Serializer<T> implements BaseInterface {
  @Expose()
  @Field(() => ID)
  id?: string;

  @Expose()
  created_at?: Date;

  @Expose()
  updated_at?: Date;

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}
