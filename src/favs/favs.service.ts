import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';

import { DatabaseService } from 'src/database/database.service';
import { Entity } from 'src/enums/entity.enum';
import { EntityAlreadyInFavoritesException } from 'src/exceptions/already-in-favs.exception';
import { NotInFavoritesException } from 'src/exceptions/not-in-favs.exception';

import { FavoritesResponse } from 'src/models/favs.model';
import { AlbumService } from '../album/album.service';
import { TrackService } from 'src/track/track.service';

const favsId = '1';

@Injectable()
export class FavsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

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
      await this.artistService.getArtist(id);
    } catch {
      throw new UnprocessableEntityException(
        "Artist with given ID doesn't exist",
      );
    }

    const artist = await this.artistService.getArtist(id);

    const isAlreadyInFavorites =
      await this.databaseService.favorites.findUnique({
        where: { id: favsId },
        select: {
          artists: {
            where: {
              id: artist.id,
            },
          },
        },
      });

    if (isAlreadyInFavorites?.artists?.length > 0) {
      throw new EntityAlreadyInFavoritesException(id, Entity.ARTIST);
    }

    await this.databaseService.artist.update({
      where: { id },
      data: {
        favorites: {
          connect: { id: favsId },
        },
      },
    });

    return this.entityAddedResponse(Entity.ARTIST);
  }

  async deleteArtist(id: string): Promise<void> {
    try {
      await this.artistService.getArtist(id);
    } catch {
      throw new UnprocessableEntityException(
        "Album with given ID doesn't exist",
      );
    }

    const artist = await this.artistService.getArtist(id);

    const isInFavourites = await this.databaseService.favorites.findUnique({
      where: { id: favsId },
      select: {
        artists: {
          where: {
            id: artist.id,
          },
        },
      },
    });

    if (!isInFavourites?.artists?.length) {
      throw new NotInFavoritesException(id, Entity.ARTIST);
    }

    await this.databaseService.artist.update({
      where: { id },
      data: {
        favorites: {
          disconnect: { id: favsId },
        },
      },
    });
  }

  async addAlbum(id: string): Promise<string> {
    try {
      await this.albumService.getAlbum(id);
    } catch {
      throw new UnprocessableEntityException(
        "Album with given ID doesn't exist",
      );
    }

    const album = await this.albumService.getAlbum(id);

    const isAlreadyInFavorites =
      await this.databaseService.favorites.findUnique({
        where: { id: favsId },
        select: {
          albums: {
            where: {
              id: album.id,
            },
          },
        },
      });

    if (isAlreadyInFavorites?.albums?.length > 0) {
      throw new EntityAlreadyInFavoritesException(id, Entity.ALBUM);
    }

    await this.databaseService.album.update({
      where: { id },
      data: {
        favorites: {
          connect: { id: favsId },
        },
      },
    });

    return this.entityAddedResponse(Entity.ALBUM);
  }

  async deleteAlbum(id: string): Promise<void> {
    try {
      await this.albumService.getAlbum(id);
    } catch {
      throw new UnprocessableEntityException(
        "Album with given ID doesn't exist",
      );
    }

    const album = await this.albumService.getAlbum(id);

    const isInFavourites = await this.databaseService.favorites.findUnique({
      where: { id: favsId },
      select: {
        albums: {
          where: {
            id: album.id,
          },
        },
      },
    });

    if (!isInFavourites?.albums?.length) {
      throw new NotInFavoritesException(id, Entity.ALBUM);
    }

    await this.databaseService.album.update({
      where: { id },
      data: {
        favorites: {
          disconnect: { id: favsId },
        },
      },
    });
  }

  async addTrack(id: string): Promise<string> {
    try {
      await this.trackService.getTrack(id);
    } catch {
      throw new UnprocessableEntityException(
        "Track with given ID doesn't exist",
      );
    }

    const track = await this.trackService.getTrack(id);

    const isAlreadyInFavorites =
      await this.databaseService.favorites.findUnique({
        where: { id: favsId },
        select: {
          tracks: {
            where: {
              id: track.id,
            },
          },
        },
      });

    if (isAlreadyInFavorites?.tracks?.length > 0) {
      throw new EntityAlreadyInFavoritesException(id, Entity.TRACK);
    }

    await this.databaseService.track.update({
      where: { id },
      data: {
        favorites: {
          connect: { id: favsId },
        },
      },
    });

    return this.entityAddedResponse(Entity.TRACK);
  }

  async deleteTrack(id: string): Promise<void> {
    try {
      await this.trackService.getTrack(id);
    } catch {
      throw new UnprocessableEntityException(
        "Track with given ID doesn't exist",
      );
    }

    const track = await this.trackService.getTrack(id);

    const isInFavourites = await this.databaseService.favorites.findUnique({
      where: { id: favsId },
      select: {
        tracks: {
          where: {
            id: track.id,
          },
        },
      },
    });

    if (!isInFavourites?.tracks?.length) {
      throw new NotInFavoritesException(id, Entity.TRACK);
    }

    await this.databaseService.track.update({
      where: { id },
      data: {
        favorites: {
          disconnect: { id: favsId },
        },
      },
    });
  }

  private entityAddedResponse(entity: Entity): string {
    return `${entity} added to favs successfully`;
  }
}
