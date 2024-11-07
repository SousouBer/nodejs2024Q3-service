import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
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
    return this.favsService.addTrackToFavs(id);
  }
}