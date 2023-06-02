import { BaseInterface } from '@app/common/interfaces';
import { Exclude } from 'class-transformer';

export class UpdateDto<T> implements BaseInterface {
  @Exclude()
  id?: string;

  @Exclude()
  created_at?: Date;

  @Exclude()
  updated_at?: Date;

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}
