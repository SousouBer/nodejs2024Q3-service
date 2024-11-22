import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService, DatabaseService],
  imports: [DatabaseModule],
  exports: [FavsService],
})
export class FavsModule {}
