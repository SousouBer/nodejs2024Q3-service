import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';

import { DatabaseService } from 'src/database/database.service';
import { Entity } from 'src/enums/entity.enum';
import { EntityAlreadyInFavoritesException } from 'src/exceptions/already-in-favs.exception';
import { NotInFavoritesException } from 'src/exceptions/not-in-favs.exception';

import { FavoritesResponse } from 'src/models/favs.model';
import { AlbumService } from '../album/album.service';
import { TrackService } from 'src/track/track.service';
import { Artist } from 'src/models/artist.model';
import { Album } from 'src/models/album.model';
import { Track } from 'src/models/track.model';

const favsId = '1';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async getFavs(): Promise<FavoritesResponse> {
    const favs = await this.databaseService.favorites.findUnique({
      where: { id: '1' },
      select: { artists: true, albums: true, tracks: true },
    });

    if (!favs) {
      return { artists: [], albums: [], tracks: [] };
    }

    return favs;
  }

  async addArtist(id: string): Promise<Artist> {
    try {
      return await this.databaseService.artist.update({
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
    } catch {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
  }

  async deleteArtist(id: string): Promise<Artist> {
    try {
      return await this.databaseService.artist.update({
        where: { id },
        data: {
          favorites: {
            disconnect: { id: favsId },
          },
        },
      });
    } catch {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
  }

  async addAlbum(id: string): Promise<Album> {
    try {
      return await this.databaseService.album.update({
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
    } catch {
      throw new UnprocessableEntityException("Album doesn't exist");
    }
  }

  async deleteAlbum(id: string): Promise<Album> {
    try {
      return await this.databaseService.album.update({
        where: { id },
        data: {
          favorites: {
            disconnect: { id: favsId },
          },
        },
      });
    } catch {
      throw new UnprocessableEntityException("Album doesn't exist");
    }
  }

  async addTrack(id: string): Promise<Track> {
    try {
      return await this.databaseService.track.update({
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
    } catch {
      throw new UnprocessableEntityException("Track doesn't exist");
    }
  }

  async deleteTrack(id: string): Promise<Track> {
    try {
      return await this.databaseService.track.update({
        where: { id },
        data: {
          favorites: {
            disconnect: { id: favsId },
          },
        },
      });
    } catch {
      throw new UnprocessableEntityException("Track doesn't exist");
    }
  }
}
