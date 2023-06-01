import type { DynamicModule } from '@nestjs/common';
import type { RedisOptions } from 'ioredis';
import { Module } from '@nestjs/common';

import { RedisService } from './redis.service';
import { REDIS_OPTIONS } from './consts';

@Module({})
export class RedisModule {
  static register(options: RedisOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_OPTIONS,
          useValue: options,
        },
        RedisService,
      ],
      exports: [RedisService],
    };
  }
}
