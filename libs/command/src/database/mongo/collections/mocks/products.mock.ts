import { Product } from '@app/common/interfaces';
import { Category } from '@app/common/enums';
import { MongoId } from '@app/common/utils';
import { Types } from 'mongoose';

export const products: (Product & { _id: Types.ObjectId })[] = [
  {
    _id: MongoId('647a1bc0537ba2d21101fe77'),
    supplier_id: '647a1c5b537ba2d21101fe7a',
    name: 'cherry',
    price: 50000,
    category: Category.FRUIT,
    created_at: new Date(),
  },
  {
    _id: MongoId('647a1bc0537ba2d21101fe78'),
    supplier_id: '647a1c5b537ba2d21101fe7a',
    name: 'banana',
    price: 50000,
    category: Category.FRUIT,
    created_at: new Date(),
  },
  {
    _id: MongoId('647a1bc0537ba2d21101fe79'),
    supplier_id: '647a1c5b537ba2d21101fe7b',
    name: 'basil',
    price: 50000,
    category: Category.VEGETABLE,
    created_at: new Date(),
  },
];
