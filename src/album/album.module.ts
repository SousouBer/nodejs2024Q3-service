import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({})
export class AlbumModule {
  controllers: [AlbumController];
  providers: [AlbumService];
  exports: [AlbumService];
}
