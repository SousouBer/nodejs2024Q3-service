import { Injectable } from '@nestjs/common';
import { Artist } from 'src/models/artist.model';
import { CreateArtistDto } from './dto/create-artist.dto';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  getAllArtists(): Artist[] {
    return this.artists;
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
}
