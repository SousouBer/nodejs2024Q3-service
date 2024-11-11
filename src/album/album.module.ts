import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { CleanupModule } from 'src/helpers/cleanup/cleanup.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [forwardRef(() => CleanupModule)],
  exports: [AlbumService],
})
export class AlbumModule {}
