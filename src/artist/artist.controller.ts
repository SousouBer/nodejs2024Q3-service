import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from 'src/models/artist.model';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAllArtists(): Promise<Artist[]> {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  getArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return this.artistService.getArtist(id);
  }

  @Post()
  createArtist(
    @Body(ValidationPipe) createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.artistService.deleteArtist(id);
  }
}
