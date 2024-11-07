import { Injectable } from '@nestjs/common';
import { Album } from 'src/models/album.model';
import { CreateAlbumDto } from './dto/create-album.dto';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  getAllAlbums(): Album[] {
    return this.albums;
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
}
