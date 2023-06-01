import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { DatabaseService } from './database.service';
import { MongoModule } from './mongo';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoModule],
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
