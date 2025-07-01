import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AudioPartsService } from './audio_parts.service';
import { CreateAudioPartDto } from './dto/create-audio_part.dto';
import { UpdateAudioPartDto } from './dto/update-audio_part.dto';

@Controller('audio-parts')
export class AudioPartsController {
  constructor(private readonly audioPartsService: AudioPartsService) {}

  @Post()
  create(@Body() createAudioPartDto: CreateAudioPartDto) {
    return this.audioPartsService.create(createAudioPartDto);
  }

  @Get()
  findAll() {
    return this.audioPartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioPartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAudioPartDto: UpdateAudioPartDto) {
    return this.audioPartsService.update(+id, updateAudioPartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audioPartsService.remove(+id);
  }
}
