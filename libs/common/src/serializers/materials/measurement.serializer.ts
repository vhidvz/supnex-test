import { MeasurementInterface } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';

import { Serializer } from '../base';

@Exclude()
export class Measurement
  extends Serializer<MeasurementInterface>
  implements MeasurementInterface
{
  @Expose()
  name: string;

  @Expose()
  symbol: string;
}
