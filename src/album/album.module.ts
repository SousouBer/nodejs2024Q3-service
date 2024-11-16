import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { CleanupModule } from 'src/helpers/cleanup/cleanup.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [forwardRef(() => CleanupModule), DatabaseModule],
  exports: [AlbumService],
})
export class AlbumModule {}
