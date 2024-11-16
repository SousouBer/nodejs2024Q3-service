import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from 'src/models/album.model';
import { CreateAlbumDto } from './dto/create-album.dto';

import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllAlbums(): Promise<Album[]> {
    return await this.databaseService.album.findMany();
  }

  async getAlbum(id: string): Promise<Album> {
    const album = await this.databaseService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} does not exist`);
    }

    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.databaseService.album.create({ data: createAlbumDto });
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.databaseService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} does not exist`);
    }

    return await this.databaseService.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async deleteAlbum(id: string): Promise<void> {
    try {
      await this.databaseService.album.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Album with ID ${id} does not exist`);
    }
  }

  // deleteArtist(artistId: string): void {
  //   this.albums.forEach((album) => {
  //     if (album.artistId === artistId) {
  //       album.artistId = null;
  //     }
  //   });
  // }
}
