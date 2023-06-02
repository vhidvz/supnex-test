import { Material } from '@app/common/interfaces';
import { Category } from '@app/common/enums';
import { MongoId } from '@app/common/utils';
import { Types } from 'mongoose';

export const materials: (Material & { _id: Types.ObjectId })[] = [
  {
    _id: MongoId('647a19f7537ba2d21101fe74'),
    category: Category.FRUIT,
    measurement: {
      name: 'Weight',
      symbol: 'Kg',
    },
    name: 'cherry',
    created_at: new Date(),
  },
  {
    _id: MongoId('647a1af6537ba2d21101fe75'),
    category: Category.FRUIT,
    measurement: {
      name: 'Weight',
      symbol: 'Kg',
    },
    name: 'banana',
    created_at: new Date(),
  },
  {
    _id: MongoId('647a1d38537ba2d21101fe76'),
    category: Category.VEGETABLE,
    measurement: {
      name: 'Weight',
      symbol: 'Kg',
    },
    name: 'basil',
    created_at: new Date(),
  },
];
