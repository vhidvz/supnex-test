import { DynamicModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { HEALTH_CHECK_OPTIONS } from './consts';
import { HealthCheckOptions } from './types';

@Module({})
export class HealthModule {
  static register(options?: HealthCheckOptions): DynamicModule {
    return {
      module: HealthModule,
      imports: [TerminusModule],
      providers: [
        {
          useValue: options,
          provide: HEALTH_CHECK_OPTIONS,
        },
        HealthService,
      ],
      controllers: [HealthController],
      exports: [HealthService],
    };
  }
}
