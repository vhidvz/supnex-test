import { NODE_ENV, REDIS_CONFIG, SENTRY_DSN } from '@app/common/configs';
import { ClientsModule } from '@nestjs/microservices';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { RedisModule } from '@app/redis';
import { Module } from '@nestjs/common';

import { clientsModuleOptions } from './suppliers.const';
import { SuppliersController } from './suppliers.controller';
import { SuppliersProvider } from './suppliers.provider';
import { SuppliersResolver } from './suppliers.resolver';

@Module({
  imports: [
    RedisModule.register(REDIS_CONFIG()),
    ClientsModule.register(clientsModuleOptions),
    SentryModule.forRoot({
      debug: NODE_ENV().IS_DEVELOPMENT,
      dsn: NODE_ENV().IS_DEVELOPMENT ? undefined : SENTRY_DSN(),
      environment: NODE_ENV().IS_DEVELOPMENT ? 'dev' : 'supplierion',
      logLevels: ['log', 'error', 'warn', 'debug', 'verbose'],
      release: process.env.npm_package_version,
      tracesSampleRate: 1.0,
      maxBreadcrumbs: 10,
    }),
  ],
  controllers: [SuppliersController],
  providers: [SuppliersProvider, SuppliersResolver],
  exports: [SuppliersProvider],
})
export class SuppliersModule {}
