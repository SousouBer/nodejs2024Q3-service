import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({})
export class ArtistModule {
  controllers: [ArtistController];
  providers: [ArtistService];
  exports: [ArtistService];
}
