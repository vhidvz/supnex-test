import { NestFactory } from '@nestjs/core';
import { StocksModule } from './stocks.module';

async function bootstrap() {
  const app = await NestFactory.create(StocksModule);
  await app.listen(3000);
}
bootstrap();
