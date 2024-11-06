import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from 'src/models/artist.model';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAllArtists(): Artist[] {
    return this.artistService.getAllArtists();
  }

  @Post()
  createArtist(@Body(ValidationPipe) createArtistDto: CreateArtistDto): Artist {
    return this.artistService.createArtist(createArtistDto);
  }
}
