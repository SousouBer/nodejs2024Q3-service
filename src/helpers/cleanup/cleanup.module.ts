import { forwardRef, Module } from '@nestjs/common';
import { CleanupService } from './cleanup.service';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

import { FavsModule } from 'src/favs/favs.module';

@Module({
  providers: [CleanupService],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => FavsModule),
    forwardRef(() => TrackModule),
  ],
  exports: [CleanupService],
})
export class CleanupModule {}
