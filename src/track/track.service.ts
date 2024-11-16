import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'src/models/track.model';
import { CreateTrackDto } from './dto/create-track.dto';

import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllTracks(): Promise<Track[]> {
    return await this.databaseService.track.findMany();
  }

  async getTrack(id: string): Promise<Track> {
    const track = await this.databaseService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} does not exist`);
    }

    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.databaseService.track.create({ data: createTrackDto });
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.databaseService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} does not exist`);
    }

    return await this.databaseService.track.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  async deleteTrack(id: string): Promise<void> {
    try {
      await this.databaseService.track.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`Track with ID ${id} does not exist`);
    }
  }

  // deleteArtist(id: string): void {
  //   this.tracks.forEach((track) => {
  //     if (track.artistId === id) {
  //       track.artistId = null;
  //     }
  //   });
  // }

  // deleteAlbum(id: string): void {
  //   this.tracks.forEach((track) => {
  //     if (track.albumId === id) {
  //       track.albumId = null;
  //     }
  //   });
  // }
}
