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
import { AlbumService } from './album.service';
import { Album } from 'src/models/album.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAllAlbums(): Album[] {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id', ParseUUIDPipe) id: string): Album {
    return this.albumService.getAlbum(id);
  }

  @Post()
  createAlbum(@Body(ValidationPipe) createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ): Album {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    this.albumService.deleteAlbum(id);
  }
}
