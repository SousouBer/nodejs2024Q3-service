import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from 'src/models/track.model';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAllTracks(): Track[] {
    return this.trackService.getAllTracks();
  }

  @Post()
  createTrack(@Body(ValidationPipe) createTrackDto: CreateTrackDto): Track {
    return this.trackService.createTrack(createTrackDto);
  }
}
