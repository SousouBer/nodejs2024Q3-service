import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from 'src/models/artist.model';
import { CreateArtistDto } from './dto/create-artist.dto';

import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtist(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} does not exist`);
    }

    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.getArtist(id);

    this.artists = this.artists.map((artist) =>
      artist.id === id ? { ...artist, ...updateArtistDto } : artist,
    );

    return { ...artist, ...updateArtistDto };
  }

  deleteArtist(id: string): void {
    this.getArtist(id);

    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
