// src/users/dto/create-user.dto.ts
import { IsEmail, IsString, IsDateString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fname: string;

  @IsString()
  lname: string;

  @IsDateString()
  dob: string; 

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
