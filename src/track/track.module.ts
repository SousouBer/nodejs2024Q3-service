import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({})
export class TrackModule {
  controllers: [TrackController];
  providers: [TrackService];
  exports: [TrackService];
}
