import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [DatabaseModule, JwtModule],
  exports: [AlbumService],
})
export class AlbumModule {}
