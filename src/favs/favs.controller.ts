import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesResponse } from 'src/models/favs.model';
import { Track } from 'src/models/track.model';
import { Album } from 'src/models/album.model';
import { Artist } from 'src/models/artist.model';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  async getFavs(): Promise<FavoritesResponse> {
    return this.favsService.getFavs();
  }

  @Post('/track/:id')
  async AddTrackToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    return this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavs(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Track> {
    return this.favsService.deleteTrack(id);
  }

  @Post('/album/:id')
  async AddAlbumToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFromFavs(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Album> {
    return this.favsService.deleteAlbum(id);
  }

  @Post('/artist/:id')
  async AddArtistToFavs(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Artist> {
    return this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFromFavs(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Artist> {
    return this.favsService.deleteArtist(id);
  }
}
