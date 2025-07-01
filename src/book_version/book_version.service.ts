import { Injectable } from "@nestjs/common";
import { CreateBookVersionDto } from "./dto/create-book_version.dto";
import { UpdateBookVersionDto } from "./dto/update-book_version.dto";
import { InjectModel } from "@nestjs/sequelize";
import { BookVersion } from "./entities/book_version.entity";

@Injectable()
export class BookVersionService {
  constructor(
    @InjectModel(BookVersion)
    private readonly bookVersionModel: typeof BookVersion
  ) {}
  create(createBookVersionDto: CreateBookVersionDto) {
    return this.bookVersionModel.create(createBookVersionDto);
  }

  findAll() {
    return this.bookVersionModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.bookVersionModel.findByPk(id);
  }

  update(id: number, updateBookVersionDto: UpdateBookVersionDto) {
    return this.bookVersionModel.update(updateBookVersionDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.bookVersionModel.destroy({ where: { id } });
  }
}
