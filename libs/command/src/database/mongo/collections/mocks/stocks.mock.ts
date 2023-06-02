import { Stock } from '@app/common/interfaces';
import { MongoId } from '@app/common/utils';
import { Types } from 'mongoose';

export const stocks: (Stock & { _id: Types.ObjectId })[] = [
  {
    _id: MongoId('647a1cff537ba2d21101fe7c'),
    material_id: '647a19f7537ba2d21101fe74',
    product_id: '647a1bc0537ba2d21101fe77',
    amount: 100,
    created_at: new Date(),
  },
  {
    _id: MongoId('647a1cff537ba2d21101fe7d'),
    material_id: '647a1d38537ba2d21101fe76',
    product_id: '647a1bc0537ba2d21101fe79',
    amount: 150,
    created_at: new Date(),
  },
];
