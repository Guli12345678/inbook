import { Injectable } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Book } from "./entities/book.entity";

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book) private readonly bookModel: typeof Book) {}
  create(createBookDto: CreateBookDto) {
    return this.bookModel.create(createBookDto);
  }

  findAll() {
    return this.bookModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.bookModel.findByPk(id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookModel.update(updateBookDto, { where: { id } });
  }

  remove(id: number) {
    return this.bookModel.destroy({ where: { id } });
  }
}
