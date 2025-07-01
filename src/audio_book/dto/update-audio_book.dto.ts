import { PartialType } from '@nestjs/swagger';
import { CreateAudioBookDto } from './create-audio_book.dto';

export class UpdateAudioBookDto extends PartialType(CreateAudioBookDto) {
  book_versionId?: number;
  narrator_name?: string;
  total_duration?: number;
  total_size_mb?: string;
}
