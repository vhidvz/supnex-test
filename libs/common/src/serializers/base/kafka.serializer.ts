import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class KafkaSerializer<T = any> {
  @Expose()
  key?: string;

  @Expose()
  value: T;

  @Expose()
  headers?: Record<string, any>;

  static build<T = any>(value: T): KafkaSerializer<T> {
    return new KafkaSerializer({ value });
  }

  constructor(data?: Partial<KafkaSerializer>) {
    if (data) Object.assign(this, data);
  }
}
