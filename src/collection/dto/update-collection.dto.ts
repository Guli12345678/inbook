import { PartialType } from '@nestjs/swagger';
import { CreateCollectionDto } from './create-collection.dto';

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {
  title: string;
  description: string;
  coverImageUrl: string;
}
