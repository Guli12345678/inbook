import { PartialType } from "@nestjs/swagger";
import { CreateBookMarkDto } from "./create-book_mark.dto";

export class UpdateBookMarkDto extends PartialType(CreateBookMarkDto) {
  userId?: number;
  bookId?: number;
  note?: string;
  position?: string;
}
