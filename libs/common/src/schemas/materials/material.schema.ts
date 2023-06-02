import { MaterialInterface } from '@app/common/interfaces';
import { Category } from '@app/common/enums';
import { Prop } from '@typegoose/typegoose';

import { Measurement } from './measurement.schema';
import { Schema } from '../base';

export class Material
  extends Schema<MaterialInterface>
  implements MaterialInterface
{
  @Prop({ type: String, required: true, index: true })
  name: string;

  @Prop({ type: String, enum: Category, required: true })
  category: Category;

  @Prop({ type: Measurement, required: true })
  measurement: Measurement;
}
