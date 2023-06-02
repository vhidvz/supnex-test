import { ProductInterface } from '@app/common/interfaces';
import { Prop, buildSchema } from '@typegoose/typegoose';
import { Category } from '@app/common/enums';
import { Document } from 'mongoose';

import { Schema } from '../base';

export class Product
  extends Schema<ProductInterface>
  implements ProductInterface
{
  @Prop({ type: String, required: true, index: true })
  supplier_id: string;

  @Prop({ type: String, required: true, index: true })
  name: string;

  @Prop({ type: Number, required: true, min: 0 })
  price: number;

  @Prop({ type: String, enum: Category })
  category: Category;
}

export type ProductDocument = Product & Document;
export const ProductSchema = buildSchema(Product);
