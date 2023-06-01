import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';

@Module({
  imports: [],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
