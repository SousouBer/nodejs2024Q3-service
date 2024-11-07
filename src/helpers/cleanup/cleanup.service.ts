import { Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class CleanupService {
  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
    private trackService: TrackService,
  ) {}

  cleanupArtist(id: string): void {
    this.albumService.deleteArtist(id);
    this.trackService.deleteArtist(id);
  }

  cleanupAlbum(id: string): void {
    this.trackService.deleteAlbum(id);
  }
}
