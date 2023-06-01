import { NestFactory } from '@nestjs/core';
import { SuppliersModule } from './suppliers.module';

async function bootstrap() {
  const app = await NestFactory.create(SuppliersModule);
  await app.listen(3000);
}
bootstrap();
