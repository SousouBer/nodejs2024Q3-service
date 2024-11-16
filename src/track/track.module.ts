import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

import { CleanupModule } from 'src/helpers/cleanup/cleanup.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [forwardRef(() => CleanupModule), DatabaseModule],
  exports: [TrackService],
})
export class TrackModule {}
