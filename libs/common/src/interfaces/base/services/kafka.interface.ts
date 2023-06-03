import { KafkaSerializer } from '@app/common/serializers';
import { Observable } from 'rxjs';

import {
  RawUniqueFilter as UniqueFilter,
  RawCountFilter as CountFilter,
  RawFilter as Filter,
} from '../filters';
import { Total } from '../index';

interface Options {
  key?: string;
  headers?: Record<string, any>;
}

export type KafkaServiceOptions = Options;

export type KafkaObj<T> = Observable<KafkaSerializer<T>>;

export interface KafkaService<T> {
  count: (filter: CountFilter, options?: Options) => KafkaObj<Total>;

  create: (data: T, options?: Options) => KafkaObj<T>;

  find: (filter: Filter, options?: Options) => KafkaObj<Array<T>>;
  findById: (filter: UniqueFilter, options?: Options) => KafkaObj<T>;

  updateById: (data: T, filter: UniqueFilter, options?: Options) => KafkaObj<T>;
}

export type KafkaServiceInterface<T> = KafkaService<T>;
