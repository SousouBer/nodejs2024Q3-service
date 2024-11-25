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
import { AlbumService } from './album.service';
import { Album } from 'src/models/album.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllAlbums(): Promise<Album[]> {
    return this.albumService.getAllAlbums();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return this.albumService.getAlbum(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createAlbum(
    @Body(ValidationPipe) createAlbumDto: CreateAlbumDto,
  ): Promise<Album> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.albumService.deleteAlbum(id);
  }
}
