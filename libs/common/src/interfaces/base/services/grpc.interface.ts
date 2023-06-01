import { Observable } from 'rxjs';

import {
  RawUniqueFilter as UniqueFilter,
  RawCountFilter as CountFilter,
  RawFilter as Filter,
} from '../filters';
import { Total } from '../index';

export interface Update<T, F> {
  data: T;
  filter: F;
}

export interface GrpcService<T> {
  count: (filter: CountFilter) => Observable<Total>;

  create: (data: T) => Observable<T>;

  find: (filter: Filter) => Observable<Array<T>>;
  findById: (filter: UniqueFilter) => Observable<T>;

  updateById: (body: Update<T, UniqueFilter>) => Observable<T>;
}

export type GrpcServiceInterface<T> = GrpcService<T>;
