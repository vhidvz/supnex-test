import { DynamicModule, Module } from '@nestjs/common';

import { MongoProvider } from './mongo.provider';
import { MongoService } from './mongo.service';
import { MONGO_URL } from './consts';

@Module({})
export class MongoModule {
  static register(url: string): DynamicModule {
    return {
      module: MongoModule,
      providers: [
        {
          useValue: url,
          provide: MONGO_URL,
        },
        MongoService,
        MongoProvider,
      ],
      exports: [MongoService],
    };
  }
}
