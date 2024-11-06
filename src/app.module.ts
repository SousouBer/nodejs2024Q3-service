import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, TrackController],
  providers: [AppService, UserService, TrackService],
})
export class AppModule {}
