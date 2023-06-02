/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
require('log-node')();

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG, NODE_ENV } from '@app/common/configs';
import { NestFactory } from '@nestjs/core';
import { APP } from '@app/common/consts';
import { initTracing } from 'tracing';

import { StocksModule } from './stocks.module';

const { STOCKS } = APP;

async function bootstrap() {
  if (NODE_ENV().IS_PRODUCTION) await initTracing(['http', 'kafka']);

  const app = await NestFactory.create(StocksModule, { cors: true });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      subscribe: { fromBeginning: true },
      client: {
        brokers: [KAFKA_CONFIG()],
        clientId: STOCKS.CLIENT.ID,
      },
      consumer: { groupId: STOCKS.CONSUMER.GROUP_ID },
    },
  });

  await app.startAllMicroservices();
  await app.listen(STOCKS.API_PORT);

  const url = await app.getUrl();
  console.log(`Prometheus is running on ${url}/metrics`);
  console.log(`Health check is running on ${url}/status`);
  console.log(`Stocks Kafka Micro Successfully Started`);
}
bootstrap();
