import { PartialType } from "@nestjs/swagger";
import { CreateBookVersionDto } from "./create-book_version.dto";

export class UpdateBookVersionDto extends PartialType(CreateBookVersionDto) {
  bookId?: number;
  languageId?: number;
  title?: string;
  description?: string;
  text_url?: string;
  cover_url?: string;
}
