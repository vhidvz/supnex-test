import { MeasurementInterface } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';
import { ObjectType } from '@nestjs/graphql';

@Exclude()
@ObjectType()
export class MeasurementSerializer implements MeasurementInterface {
  @Expose()
  name: string;

  @Expose()
  symbol: string;
}
