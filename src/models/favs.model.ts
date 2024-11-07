import { Album } from './album.model';
import { Artist } from './artist.model';
import { Track } from './track.model';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
