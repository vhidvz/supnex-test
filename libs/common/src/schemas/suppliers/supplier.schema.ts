import { SupplierInterface } from '@app/common/interfaces';
import { Prop, buildSchema } from '@typegoose/typegoose';
import { Document } from 'mongoose';

import { Schema } from '../base';

export class Supplier
  extends Schema<SupplierInterface>
  implements SupplierInterface
{
  @Prop({ type: String, required: true, index: true })
  name: string;
}

export type SupplierDocument = Supplier & Document;
export const SupplierSchema = buildSchema(Supplier);
