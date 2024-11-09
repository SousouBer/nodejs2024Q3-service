import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({})
export class FavsModule {
  controllers: [FavsController];
  providers: [FavsService];
  imports: [ArtistModule, AlbumModule, TrackModule];
}
