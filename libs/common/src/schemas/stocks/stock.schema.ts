import { Prop, buildSchema } from '@typegoose/typegoose';
import { StockInterface } from '@app/common/interfaces';
import { Document } from 'mongoose';

import { Schema } from '../base';

export class Stock extends Schema<StockInterface> implements StockInterface {
  @Prop({ type: String, required: true, index: true })
  product_id: string;

  @Prop({ type: String, required: true, index: true })
  material_id: string;

  @Prop({ type: Number, required: true, min: 0 })
  amount: number;
}

export type StockDocument = Stock & Document;
export const StockSchema = buildSchema(Stock);
