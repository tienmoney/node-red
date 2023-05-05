/* eslint-disable prettier/prettier */
import { IsEmail } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirmPassword: string;
  @IsNotEmpty()
  @IsString()
  fullName: string;
}
