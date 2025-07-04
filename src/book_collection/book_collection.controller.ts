import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookCollectionService } from './book_collection.service';
import { CreateBookCollectionDto } from './dto/create-book_collection.dto';
import { UpdateBookCollectionDto } from './dto/update-book_collection.dto';

@Controller('book-collection')
export class BookCollectionController {
  constructor(private readonly bookCollectionService: BookCollectionService) {}

  @Post()
  create(@Body() createBookCollectionDto: CreateBookCollectionDto) {
    return this.bookCollectionService.create(createBookCollectionDto);
  }

  @Get()
  findAll() {
    return this.bookCollectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookCollectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookCollectionDto: UpdateBookCollectionDto) {
    return this.bookCollectionService.update(+id, updateBookCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookCollectionService.remove(+id);
  }
}
