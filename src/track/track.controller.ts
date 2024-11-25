import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from 'src/models/track.model';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllTracks(): Promise<Track[]> {
    return this.trackService.getAllTracks();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getTrack(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    return this.trackService.getTrack(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createTrack(
    @Body(ValidationPipe) createTrackDto: CreateTrackDto,
  ): Promise<Track> {
    return this.trackService.createTrack(createTrackDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.trackService.deleteTrack(id);
  }
}
