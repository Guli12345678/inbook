import { IsString, IsNotEmpty } from "class-validator";

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsString()
  @IsNotEmpty()
  photo_url: string;
}
