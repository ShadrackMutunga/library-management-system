import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  role?: string; // Defaults to PATRON in service if not provided
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}