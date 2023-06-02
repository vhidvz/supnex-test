/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

import { Supplier, SupplierSchema } from '@app/common/schemas';
import { Test, TestingModule } from '@nestjs/testing';
import { MONGO_CONFIG } from '@app/common/configs';
import { MongooseModule } from '@nestjs/mongoose';

import { SuppliersRepository } from './suppliers.repository';
import { SuppliersService } from './suppliers.service';

describe('SuppliersService', () => {
  let suppliersService: SuppliersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(MONGO_CONFIG()),
        MongooseModule.forFeature([
          { name: Supplier.name, schema: SupplierSchema },
        ]),
      ],
      providers: [SuppliersService, SuppliersRepository],
    }).compile();

    suppliersService = app.get<SuppliersService>(SuppliersService);
  });

  describe('services', () => {
    it('should return total number of suppliers', async () => {
      expect(await suppliersService.count({ query: {} })).toBeGreaterThan(0);
    });
  });
});
