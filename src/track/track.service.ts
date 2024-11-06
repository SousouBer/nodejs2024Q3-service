import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'src/models/track.model';
import { CreateTrackDto } from './dto/create-track.dto';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrack(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} does not exist`);
    }

    return track;
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }
}
