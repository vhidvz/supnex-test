import { MaterialInterface } from '@app/common/interfaces';
import { Exclude, Expose, Type } from 'class-transformer';
import { ObjectType } from '@nestjs/graphql';
import { Category } from '@app/common/enums';

import { MeasurementSerializer } from './measurement.serializer';
import { Serializer } from '../base';

@Exclude()
@ObjectType()
export class MaterialSerializer
  extends Serializer<MaterialInterface>
  implements MaterialInterface
{
  @Expose()
  name: string;

  @Expose()
  category: Category;

  @Expose()
  @Type(() => MeasurementSerializer)
  measurement: MeasurementSerializer;
}
