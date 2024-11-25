import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [DatabaseModule, JwtModule],
  exports: [TrackService],
})
export class TrackModule {}
