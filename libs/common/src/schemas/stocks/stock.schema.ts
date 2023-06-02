import { SupplierInterface } from '@app/common/interfaces';
import { Prop } from '@typegoose/typegoose';

import { Schema } from '../base';

export class Supplier
  extends Schema<SupplierInterface>
  implements SupplierInterface
{
  @Prop({ type: String, required: true, unique: true })
  name: string;
}
