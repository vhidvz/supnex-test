import { BaseInterface } from '../base';

export interface Stock extends BaseInterface {
  product_id: string;
  material_id: string;

  amount: number;
}

export type StockInterface = Stock;
