import { forwardRef, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { CleanupModule } from 'src/helpers/cleanup/cleanup.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [forwardRef(() => CleanupModule), DatabaseModule],
  exports: [ArtistService],
})
export class ArtistModule {}
