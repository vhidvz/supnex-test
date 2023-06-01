import { NestFactory } from '@nestjs/core';
import { MaterialsModule } from './materials.module';

async function bootstrap() {
  const app = await NestFactory.create(MaterialsModule);
  await app.listen(3000);
}
bootstrap();
