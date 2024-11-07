import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from 'src/models/album.model';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAllAlbums(): Album[] {
    return this.albumService.getAllAlbums();
  }

  @Post()
  createAlbum(@Body(ValidationPipe) createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.createAlbum(createAlbumDto);
  }
}
