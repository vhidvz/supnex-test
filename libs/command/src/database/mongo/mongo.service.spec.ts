import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { MongoProvider } from './mongo.provider';
import { MongoService } from './mongo.service';

describe('MongoService', () => {
  let service: MongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoService, MongoProvider],
    }).compile();

    service = await module.resolve<MongoService>(MongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
