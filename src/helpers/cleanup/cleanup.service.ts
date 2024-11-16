import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { Entity } from 'src/enums/entity.enum';
import { FavsService } from 'src/favs/favs.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class CleanupService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => FavsService))
    private readonly favService: FavsService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  // cleanupArtist(id: string): void {
  //   this.albumService.deleteArtist(id);
  //   this.trackService.deleteArtist(id);

  //   const artist = this.favService
  //     .getFavs()
  //     .artists.find((artist) => artist.id === id);

  //   if (artist) {
  //     this.favService.deleteFromFavs(id, Entity.ARTIST);
  //   }
  // }

  // cleanupAlbum(id: string): void {
  //   this.trackService.deleteAlbum(id);

  //   const album = this.favService
  //     .getFavs()
  //     .albums.find((album) => album.id === id);

  //   if (album) {
  //     this.favService.deleteFromFavs(id, Entity.ALBUM);
  //   }
  // }

  // cleanupTrack(id: string): void {
  //   const track = this.favService
  //     .getFavs()
  //     .tracks.find((track) => track.id === id);

  //   if (track) {
  //     this.favService.deleteFromFavs(id, Entity.TRACK);
  //   }
  // }
}
