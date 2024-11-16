import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { Entity } from 'src/enums/entity.enum';

import { FavoritesResponse } from 'src/models/favs.model';

const favsId = '1';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getFavs(): Promise<FavoritesResponse> {
    const favs = await this.databaseService.favorites.findUnique({
      where: { id: favsId },
      select: { artists: true, albums: true, tracks: true },
    });

    if (!favs) {
      return { artists: [], albums: [], tracks: [] };
    }

    return favs;
  }

  async addArtist(id: string): Promise<string> {
    try {
      await this.databaseService.artist.update({
        where: { id },
        data: {
          favorites: {
            connectOrCreate: {
              where: { id: favsId },
              create: { id: favsId },
            },
          },
        },
      });

      return this.entityAddedResponse(Entity.ARTIST);
    } catch {
      throw new UnprocessableEntityException(
        "Artist with given ID doesn't exist",
      );
    }
  }

  async deleteArtist(id: string): Promise<void> {
    try {
      await this.databaseService.artist.update({
        where: { id },
        data: {
          favorites: {
            disconnect: { id: favsId },
          },
        },
      });
    } catch {
      throw new UnprocessableEntityException(
        "Artist with given ID doesn't exist",
      );
    }
  }

  async addAlbum(id: string): Promise<string> {
    try {
      await this.databaseService.album.update({
        where: { id },
        data: {
          favorites: {
            connectOrCreate: {
              where: { id: favsId },
              create: { id: favsId },
            },
          },
        },
      });

      return this.entityAddedResponse(Entity.ALBUM);
    } catch {
      throw new UnprocessableEntityException(
        "Album with given ID doesn't exist",
      );
    }
  }

  async deleteAlbum(id: string): Promise<void> {
    try {
      await this.databaseService.album.update({
        where: { id },
        data: {
          favorites: {
            disconnect: { id: favsId },
          },
        },
      });
    } catch {
      throw new UnprocessableEntityException(
        "Album with given ID doesn't exist",
      );
    }
  }

  async addTrack(id: string): Promise<string> {
    try {
      await this.databaseService.track.update({
        where: { id },
        data: {
          favorites: {
            connectOrCreate: {
              where: { id: favsId },
              create: { id: favsId },
            },
          },
        },
      });

      return this.entityAddedResponse(Entity.TRACK);
    } catch {
      throw new UnprocessableEntityException(
        "Track with given ID doesn't exist",
      );
    }
  }

  async deleteTrack(id: string): Promise<void> {
    try {
      await this.databaseService.track.update({
        where: { id },
        data: {
          favorites: {
            disconnect: { id: favsId },
          },
        },
      });
    } catch {
      throw new UnprocessableEntityException(
        "Track with given ID doesn't exist",
      );
    }
  }

  private entityAddedResponse(entity: Entity): string {
    return `${entity} added to favs successfully`;
  }
}
