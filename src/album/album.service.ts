import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from 'src/models/album.model';
import { CreateAlbumDto } from './dto/create-album.dto';

import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbum(id: string): Album {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} does not exist`);
    }

    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.getAlbum(id);

    this.albums = this.albums.map((album) =>
      album.id === id ? { ...album, ...updateAlbumDto } : album,
    );

    return { ...album, ...updateAlbumDto };
  }

  deleteAlbum(id: string): void {
    this.getAlbum(id);

    this.albums = this.albums.filter((album) => album.id !== id);
  }

  deleteArtist(artistId: string): void {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
