import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpCode,
  Inject,
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
import { CleanupService } from 'src/helpers/cleanup/cleanup.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private artistService: ArtistService,
    @Inject(forwardRef(() => CleanupService))
    private readonly cleanupService: CleanupService,
  ) {}

  @Get()
  getAllArtists(): Artist[] {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  getArtist(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.artistService.getArtist(id);
  }

  @Post()
  createArtist(@Body(ValidationPipe) createArtistDto: CreateArtistDto): Artist {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateArtistDto: UpdateArtistDto,
  ): Artist {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string): void {
    this.artistService.deleteArtist(id);
    this.cleanupService.cleanupArtist(id);
  }
}
