import { forwardRef, Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
  ],
  exports: [FavsService],
})
export class FavsModule {}
