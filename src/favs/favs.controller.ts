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
  getFavs(): Promise<FavoritesResponse> {
    return this.favsService.getFavs();
  }

  @Post('/track/:id')
  AddTrackToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrackFromFavs(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.favsService.deleteTrack(id);
  }

  @Post('/album/:id')
  AddAlbumToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbumFromFavs(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.favsService.deleteAlbum(id);
  }

  @Post('/artist/:id')
  AddArtistToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtistFromFavs(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.favsService.deleteArtist(id);
  }
}
