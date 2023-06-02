/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

import { Material, MaterialSchema } from '@app/common/schemas';
import { Test, TestingModule } from '@nestjs/testing';
import { MONGO_CONFIG } from '@app/common/configs';
import { MongooseModule } from '@nestjs/mongoose';

import { MaterialsRepository } from './materials.repository';
import { MaterialsService } from './materials.service';

describe('MaterialsService', () => {
  let materialsService: MaterialsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(MONGO_CONFIG()),
        MongooseModule.forFeature([
          { name: Material.name, schema: MaterialSchema },
        ]),
      ],
      providers: [MaterialsService, MaterialsRepository],
    }).compile();

    materialsService = app.get<MaterialsService>(MaterialsService);
  });

  describe('services', () => {
    it('should return total number of materials', async () => {
      expect(await materialsService.count({ query: {} })).toBeGreaterThan(0);
    });
  });
});
