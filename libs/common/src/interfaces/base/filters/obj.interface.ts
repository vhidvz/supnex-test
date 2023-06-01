import type { FilterQuery, ProjectionFields, SortOrder } from 'mongoose';

import { RawFilterInterface } from './index';

export type Query<T = any> = FilterQuery<T>;
export type Projection<T = any> = ProjectionFields<T>;
export interface Pagination<T = any> {
  limit: number;
  skip?: number;
  sort?: { [key in keyof T]: SortOrder | { $meta: 'textScore' } };
}

export interface RawMethodInterface {
  raw: () => RawFilterInterface;
}

export interface Filter<T = any> extends RawMethodInterface {
  query: Query<T>;
  projection?: Projection<T>;
  pagination?: Pagination<T>;
}
export type CountFilter<T = any> = Pick<Filter<T>, 'query' | 'raw'>;
export type UniqueFilter<T = any> = {
  id: string;
  projection?: Projection<T>;
} & RawMethodInterface;

export type FilterInterface<T = any> = Filter<T>;
export type CountFilterInterface<T = any> = CountFilter<T>;
export type UniqueFilterInterface<T = any> = UniqueFilter<T>;
