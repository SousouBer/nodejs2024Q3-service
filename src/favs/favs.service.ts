import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { FavoritesResponse } from 'src/models/favs.model';
import { TrackService } from 'src/track/track.service';
import { NotInFavoritesException } from 'src/exceptions/not-in-favs.exception';
import { EntityAlreadyInFavoritesException } from 'src/exceptions/already-in-favs.exception';
import { Track } from 'src/models/track.model';
import { Album } from 'src/models/album.model';
import { Artist } from 'src/models/artist.model';

import { Entity } from 'src/enums/entity.enum';

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

  addToFavs(id: string, entityIdentifier: 'track' | 'album' | 'artist') {
    try {
      let entity: Album | Track | Artist;
      let favList;

      switch (entityIdentifier) {
        case Entity.TRACK:
          entity = this.trackService.getTrack(id);
          favList = this.favourites.tracks;
          break;
        case Entity.ALBUM:
          entity = this.albumService.getAlbum(id);
          favList = this.favourites.albums;
          break;
        case Entity.ARTIST:
          entity = this.artistService.getArtist(id);
          favList = this.favourites.artists;
          break;
        default:
          throw new Error(`Unknown entity type: ${entityIdentifier}`);
      }

      if (favList.includes(entity)) {
        throw new EntityAlreadyInFavoritesException(id, entityIdentifier);
      }

      favList.push(entity);

      return 'Entity added Successfully!';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotInFavoritesException(id, entityIdentifier);
      }
      throw error;
    }
  }

  deleteFromFavs(
    id: string,
    entityIdentifier: 'track' | 'album' | 'artist',
  ): void {
    let entityList;

    switch (entityIdentifier) {
      case Entity.TRACK:
        entityList = this.favourites.tracks;
        break;
      case Entity.ALBUM:
        entityList = this.favourites.albums;
        break;
      case Entity.ARTIST:
        entityList = this.favourites.artists;
        break;
      default:
        throw new Error(`Unknown entity type: ${entityIdentifier}`);
    }

    const entity: Album | Artist | Track = entityList.find(
      (entity: Album | Artist | Track) => entity.id === id,
    );

    if (!entity) {
      throw new NotFoundException(
        `${entityIdentifier} with ID ${id} is not in the favourites.`,
      );
    }

    this.favourites[entityIdentifier + 's'] = entityList.filter(
      (entity: Album | Artist | Track) => entity.id !== id,
    );
  }
}
