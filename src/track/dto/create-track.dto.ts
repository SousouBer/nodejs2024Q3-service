import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
