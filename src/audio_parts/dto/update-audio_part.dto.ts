import { PartialType } from '@nestjs/swagger';
import { CreateAudioPartDto } from './create-audio_part.dto';

export class UpdateAudioPartDto extends PartialType(CreateAudioPartDto) {
  audio_bookId?: number;
  title?: string;
  file_url?: string;
  duration?: number;
  size_mb?: string;
  order_index?: number;
}
