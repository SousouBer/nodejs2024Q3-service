import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { FavoritesResponse } from 'src/models/favs.model';
import { TrackService } from 'src/track/track.service';
import { NotInFavoritesException } from 'src/exceptions/not-in-favs.exception';
import { EntityAlreadyInFavoritesException } from 'src/exceptions/already-in-favs.exception';

@Injectable()
export class FavsService {
  constructor(
    private albumService: AlbumService,
    private trackService: TrackService,
    private artistService: ArtistService,
  ) {}

  private favourites: FavoritesResponse = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getFavs(): FavoritesResponse {
    return this.favourites;
  }

  addTrackToFavs(id: string) {
    try {
      const track = this.trackService.getTrack(id);

      if (this.favourites.tracks.includes(track)) {
        throw new EntityAlreadyInFavoritesException(id, 'track');
      }

      this.favourites.tracks.push(track);

      return 'Track added Successfully!';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotInFavoritesException(id, 'track');
      }
      throw error;
    }
  }

  deleteTrackFromFavs(id: string): void {
    const track = this.favourites.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException(
        `Track with ID ${id} is not in the favourites.`,
      );
    }

    this.favourites.tracks = this.favourites.tracks.filter(
      (track) => track.id !== id,
    );
  }

  addAlbumToFavs(id: string) {
    try {
      const album = this.albumService.getAlbum(id);

      if (this.favourites.albums.includes(album)) {
        throw new EntityAlreadyInFavoritesException(id, 'album');
      }

      this.favourites.albums.push(album);

      return 'Album added Successfully!';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotInFavoritesException(id, 'album');
      }
      throw error;
    }
  }

  deleteAlbumFromFavs(id: string): void {
    const album = this.favourites.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException(
        `Album with ID ${id} is not in the favourites.`,
      );
    }

    this.favourites.albums = this.favourites.albums.filter(
      (album) => album.id !== id,
    );
  }

  addArtistToFavs(id: string) {
    try {
      const artist = this.artistService.getArtist(id);

      if (this.favourites.artists.includes(artist)) {
        throw new EntityAlreadyInFavoritesException(id, 'artist');
      }

      this.favourites.artists.push(artist);

      return 'Artist added Successfully!';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotInFavoritesException(id, 'artist');
      }
      throw error;
    }
  }

  deleteArtistFromFavs(id: string): void {
    const artist = this.favourites.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException(
        `Artst with ID ${id} is not in the favourites.`,
      );
    }

    this.favourites.artists = this.favourites.artists.filter(
      (artist) => artist.id !== id,
    );
  }
}
