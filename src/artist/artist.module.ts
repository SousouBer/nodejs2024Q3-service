import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [DatabaseModule, JwtModule],
  exports: [ArtistService],
})
export class ArtistModule {}
