import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesResponse } from 'src/models/favs.model';

import { Entity } from 'src/enums/entity.enum';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  getFavs(): FavoritesResponse {
    return this.favsService.getFavs();
  }

  @Post('/track/:id')
  AddTrackToFavs(@Param('id', ParseUUIDPipe) id: string): string {
    return this.favsService.addToFavs(id, Entity.TRACK);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrackFromFavs(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.deleteFromFavs(id, Entity.TRACK);
  }

  @Post('/album/:id')
  AddAlbumToFavs(@Param('id', ParseUUIDPipe) id: string): string {
    return this.favsService.addToFavs(id, Entity.ALBUM);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbumFromFavs(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.deleteFromFavs(id, Entity.ALBUM);
  }

  @Post('/artist/:id')
  AddArtistToFavs(@Param('id', ParseUUIDPipe) id: string): string {
    return this.favsService.addToFavs(id, Entity.ARTIST);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtistFromFavs(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.deleteFromFavs(id, Entity.ARTIST);
  }
}
