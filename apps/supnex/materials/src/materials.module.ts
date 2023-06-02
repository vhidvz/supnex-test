import { MONGO_CONFIG, NODE_ENV, SENTRY_DSN } from '@app/common/configs';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { MaterialSchema } from '@app/common/schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@app/health';
import { Module } from '@nestjs/common';

import { MaterialsController } from './materials.controller';
import { MaterialsRepository } from './materials.repository';
import { MaterialsService } from './materials.service';
import { Material } from './schema';

@Module({
  imports: [
    PrometheusModule.register(),
    MongooseModule.forRoot(MONGO_CONFIG()),
    HealthModule.register(['disk', 'memory', 'mongo']),
    MongooseModule.forFeature([
      { name: Material.name, schema: MaterialSchema },
    ]),
    SentryModule.forRoot({
      debug: NODE_ENV().IS_DEVELOPMENT,
      dsn: NODE_ENV().IS_DEVELOPMENT ? undefined : SENTRY_DSN(),
      environment: NODE_ENV().IS_DEVELOPMENT ? 'dev' : 'production',
      logLevels: ['log', 'error', 'warn', 'debug', 'verbose'],
      release: process.env.npm_package_version,
      tracesSampleRate: 1.0,
      maxBreadcrumbs: 10,
    }),
  ],
  controllers: [MaterialsController],
  providers: [MaterialsService, MaterialsRepository],
})
export class MaterialsModule {}
