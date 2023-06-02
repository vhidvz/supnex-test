import { registerEnumType } from '@nestjs/graphql';

export enum Category {
  FRUIT = 'FRUIT',
  VEGETABLE = 'VEGETABLE',
}

registerEnumType(Category, { name: 'Category' });
