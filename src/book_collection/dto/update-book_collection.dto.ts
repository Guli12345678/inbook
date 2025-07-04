import { PartialType } from '@nestjs/swagger';
import { CreateBookCollectionDto } from './create-book_collection.dto';

export class UpdateBookCollectionDto extends PartialType(CreateBookCollectionDto) {
  collectionId?: number;
  bookId?: number;
}
