import { MONGO_CONFIG } from '@app/common/configs';
import { Module } from '@nestjs/common';

import { DatabaseService } from './database.service';
import { MongoModule } from './mongo';

@Module({
  imports: [MongoModule.register(MONGO_CONFIG())],
  providers: [DatabaseService],
})
export class DatabaseModule {}
