import { Category } from '@app/common/enums';

import { BaseInterface } from '../base';

export interface Product extends BaseInterface {
  supplier_id: string;

  name: string;
  price: number;
  category: Category;
}

export type ProductInterface = Product;
