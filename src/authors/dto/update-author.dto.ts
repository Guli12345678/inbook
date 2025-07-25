import { PartialType } from "@nestjs/swagger";
import { CreateAuthorDto } from "./create-author.dto";

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  full_name?: string;
  bio?: string;
  photo_url?: string;
}
