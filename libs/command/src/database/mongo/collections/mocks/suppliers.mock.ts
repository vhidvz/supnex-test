import { Supplier } from '@app/common/interfaces';
import { MongoId } from '@app/common/utils';
import { Types } from 'mongoose';

export const suppliers: (Supplier & { _id: Types.ObjectId })[] = [
  {
    _id: MongoId('647a1c5b537ba2d21101fe7a'),
    name: 'A Company',
    created_at: new Date(),
  },
  {
    _id: MongoId('647a1c5b537ba2d21101fe7b'),
    name: 'B Company',
    created_at: new Date(),
  },
];
