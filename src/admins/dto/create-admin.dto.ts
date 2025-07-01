import { IsString, IsNotEmpty, IsEmail, IsBoolean } from "class-validator";

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  is_creator: boolean;

  @IsBoolean()
  is_active: boolean;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
