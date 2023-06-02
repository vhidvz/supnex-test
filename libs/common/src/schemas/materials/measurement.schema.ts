import { MeasurementInterface } from '@app/common/interfaces';
import { Prop } from '@typegoose/typegoose';

export class Measurement implements MeasurementInterface {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  symbol: string;
}
