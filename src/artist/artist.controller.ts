import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from 'src/models/artist.model';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllArtists(): Promise<Artist[]> {
    return this.artistService.getAllArtists();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return this.artistService.getArtist(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createArtist(
    @Body(ValidationPipe) createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return this.artistService.createArtist(createArtistDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.artistService.deleteArtist(id);
  }
}
