import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

import { CleanupModule } from 'src/helpers/cleanup/cleanup.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [forwardRef(() => CleanupModule)],
  exports: [TrackService],
})
export class TrackModule {}
