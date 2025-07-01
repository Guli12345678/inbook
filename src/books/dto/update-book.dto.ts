import { PartialType } from "@nestjs/swagger";
import { CreateBookDto } from "./create-book.dto";

export class UpdateBookDto extends PartialType(CreateBookDto) {
  published_year?: Date;
  authorId?: number;
}
