import { forwardRef, Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService, DatabaseService],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    DatabaseModule,
  ],
  exports: [FavsService],
})
export class FavsModule {}
