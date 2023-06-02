import { BaseInterface } from '@app/common/interfaces';
import { Prop } from '@typegoose/typegoose';

export class Schema<T> implements BaseInterface {
  id?: string;

  @Prop({ type: Date, required: true, index: true, default: () => new Date() })
  created_at?: Date;

  @Prop({ type: Date, required: false })
  updated_at?: Date;

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}
