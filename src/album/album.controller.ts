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
import { AlbumService } from './album.service';
import { Album } from 'src/models/album.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CleanupService } from 'src/helpers/cleanup/cleanup.service';

@Controller('album')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    @Inject(forwardRef(() => CleanupService))
    private readonly cleanupService: CleanupService,
  ) {}

  @Get()
  getAllAlbums(): Promise<Album[]> {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return this.albumService.getAlbum(id);
  }

  @Post()
  createAlbum(
    @Body(ValidationPipe) createAlbumDto: CreateAlbumDto,
  ): Promise<Album> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.albumService.deleteAlbum(id);
    // this.cleanupService.cleanupAlbum(id);
  }
}
