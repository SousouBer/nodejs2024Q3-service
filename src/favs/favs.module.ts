import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [FavsController],
  providers: [FavsService, DatabaseService],
  imports: [DatabaseModule, JwtModule],
  exports: [FavsService],
})
export class FavsModule {}
