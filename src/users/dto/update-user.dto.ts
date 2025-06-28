import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  full_name?: string;
  email?: string;
  password?: string;
  gender?: string;
  birth_year?: number;
}
