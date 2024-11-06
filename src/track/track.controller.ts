import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from 'src/models/track.model';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAllTracks(): Track[] {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  getTrack(@Param('id', ParseUUIDPipe) id: string): Track {
    return this.trackService.getTrack(id);
  }

  @Post()
  createTrack(@Body(ValidationPipe) createTrackDto: CreateTrackDto): Track {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateTrackDto: UpdateTrackDto,
  ): Track {
    return this.trackService.updateTrack(id, updateTrackDto);
  }
}
