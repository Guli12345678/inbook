import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AudioBookService } from './audio_book.service';
import { CreateAudioBookDto } from './dto/create-audio_book.dto';
import { UpdateAudioBookDto } from './dto/update-audio_book.dto';

@Controller('audio-book')
export class AudioBookController {
  constructor(private readonly audioBookService: AudioBookService) {}

  @Post()
  create(@Body() createAudioBookDto: CreateAudioBookDto) {
    return this.audioBookService.create(createAudioBookDto);
  }

  @Get()
  findAll() {
    return this.audioBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioBookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAudioBookDto: UpdateAudioBookDto) {
    return this.audioBookService.update(+id, updateAudioBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audioBookService.remove(+id);
  }
}
