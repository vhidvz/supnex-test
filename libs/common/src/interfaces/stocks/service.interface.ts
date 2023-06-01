import { StockInterface } from './stock.interface';
import { GrpcServiceInterface } from '../base';

export type StocksServiceInterface = StocksService;
export type StocksService = GrpcServiceInterface<StockInterface>;
