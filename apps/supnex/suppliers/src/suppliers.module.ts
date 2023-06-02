import { MONGO_CONFIG, NODE_ENV, SENTRY_DSN } from '@app/common/configs';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { SupplierSchema } from '@app/common/schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@app/health';
import { Module } from '@nestjs/common';

import { SuppliersController } from './suppliers.controller';
import { SuppliersRepository } from './suppliers.repository';
import { SuppliersService } from './suppliers.service';
import { Supplier } from './schema';

@Module({
  imports: [
    PrometheusModule.register(),
    MongooseModule.forRoot(MONGO_CONFIG()),
    HealthModule.register(['disk', 'memory', 'mongo']),
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
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
  controllers: [SuppliersController],
  providers: [SuppliersService, SuppliersRepository],
})
export class SuppliersModule {}
