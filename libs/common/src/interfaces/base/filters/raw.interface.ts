export interface RawFilter {
  query: string;
  projection?: string;
  pagination?: string;
}
export type RawCountFilter = Pick<RawFilter, 'query'>;
export type RawUniqueFilter = {
  id: string;
  projection?: string;
};

export type RawFilterInterface = RawFilter;
export type RawCountFilterInterface = RawCountFilter;
export type RawUniqueFilterInterface = RawUniqueFilter;
