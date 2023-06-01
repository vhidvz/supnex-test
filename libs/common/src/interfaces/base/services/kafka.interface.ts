import { Observable } from 'rxjs';

import {
  RawUniqueFilter as UniqueFilter,
  RawCountFilter as CountFilter,
  RawFilter as Filter,
} from '../filters';
import { Total } from '../index';

export interface Options {
  key?: string;
  headers?: Record<string, any>;
}

export interface KafkaService<T> {
  count: (filter: CountFilter, options?: Options) => Observable<Total>;

  create: (data: T, options?: Options) => Observable<T>;

  find: (filter: Filter, options?: Options) => Observable<Array<T>>;
  findById: (filter: UniqueFilter, options?: Options) => Observable<T>;

  updateById: (
    data: T,
    filter: UniqueFilter,
    options?: Options,
  ) => Observable<T>;
}

export type KafkaServiceInterface<T> = KafkaService<T>;
