import { MaterialInterface } from '@app/common/interfaces';
import { Prop, buildSchema } from '@typegoose/typegoose';
import { Category } from '@app/common/enums';
import { Document } from 'mongoose';

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

export type MaterialDocument = Material & Document;
export const MaterialSchema = buildSchema(Material);
