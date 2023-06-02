import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TotalInterface } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@ObjectType()
export class TotalSerializer implements TotalInterface {
  @Expose()
  @Field(() => Int)
  count: number;

  static build(count: number): TotalSerializer {
    return new TotalSerializer({ count });
  }

  constructor(data?: Partial<TotalSerializer>) {
    if (data) Object.assign(this, data);
  }
}
