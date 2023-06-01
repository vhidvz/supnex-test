import { Module } from '@nestjs/common';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';

@Module({
  imports: [],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
