import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, TrackController, ArtistController, AlbumController],
  providers: [AppService, UserService, TrackService, ArtistService, AlbumService],
})
export class AppModule {}
