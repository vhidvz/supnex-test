import { ArrayInterface } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ArraySerializer<T> implements ArrayInterface<T> {
  @Expose()
  items: T[];

  static build<T = any>(items: T[]): ArraySerializer<T> {
    return new ArraySerializer({ items });
  }

  constructor(data?: Partial<ArraySerializer<T>>) {
    if (data) Object.assign(this, data);
  }
}
