import { IsString, MinLength } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @MinLength(2)
  name: string;
}

export class UpdateGenreDto {
  @IsString()
  @MinLength(2)
  name: string;
}