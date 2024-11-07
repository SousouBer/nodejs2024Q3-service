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

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  getFavs(): FavoritesResponse {
    return this.favsService.getFavs();
  }

  @Post('/track/:id')
  AddTrackToFavs(@Param('id', ParseUUIDPipe) id: string): string {
    return this.favsService.addToFavs(id, 'track');
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrackFromFavs(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.deleteFromFavs(id, 'track');
  }

  @Post('/album/:id')
  AddAlbumToFavs(@Param('id', ParseUUIDPipe) id: string): string {
    return this.favsService.addToFavs(id, 'album');
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbumFromFavs(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.deleteFromFavs(id, 'album');
  }

  @Post('/artist/:id')
  AddArtistToFavs(@Param('id', ParseUUIDPipe) id: string): string {
    return this.favsService.addToFavs(id, 'artist');
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtistFromFavs(@Param('id', ParseUUIDPipe) id: string): void {
    this.favsService.deleteFromFavs(id, 'artist');
  }
}
