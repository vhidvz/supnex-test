/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

import { Product, ProductSchema } from '@app/common/schemas';
import { Test, TestingModule } from '@nestjs/testing';
import { MONGO_CONFIG } from '@app/common/configs';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let productsService: ProductsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(MONGO_CONFIG()),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
      ],
      providers: [ProductsService, ProductsRepository],
    }).compile();

    productsService = app.get<ProductsService>(ProductsService);
  });

  describe('services', () => {
    it('should return total number of products', async () => {
      expect(await productsService.count({ query: {} })).toBeGreaterThan(0);
    });
  });
});
