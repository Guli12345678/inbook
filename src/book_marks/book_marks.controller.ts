import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookMarksService } from './book_marks.service';
import { CreateBookMarkDto } from './dto/create-book_mark.dto';
import { UpdateBookMarkDto } from './dto/update-book_mark.dto';

@Controller('book-marks')
export class BookMarksController {
  constructor(private readonly bookMarksService: BookMarksService) {}

  @Post()
  create(@Body() createBookMarkDto: CreateBookMarkDto) {
    return this.bookMarksService.create(createBookMarkDto);
  }

  @Get()
  findAll() {
    return this.bookMarksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookMarksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookMarkDto: UpdateBookMarkDto) {
    return this.bookMarksService.update(+id, updateBookMarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookMarksService.remove(+id);
  }
}
