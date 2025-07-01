import { IsString, IsNotEmpty, IsEmail, IsNumber } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  birth_year: number;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
