import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from 'src/models/artist.model';
import { CreateArtistDto } from './dto/create-artist.dto';

import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  private artists: Artist[] = [];

  async getAllArtists(): Promise<Artist[]> {
    return await this.databaseService.artist.findMany();
  }

  async getArtist(id: string): Promise<Artist> {
    const artist = await this.databaseService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} does not exist`);
    }

    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.databaseService.artist.create({
      data: createArtistDto,
    });
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.databaseService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} does not exist`);
    }

    return await this.databaseService.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async deleteArtist(id: string): Promise<void> {
    this.getArtist(id);
    try {
      await this.databaseService.artist.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Artist with ID ${id} does not exist`);
    }
  }
}
