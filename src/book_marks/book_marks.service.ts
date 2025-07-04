import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BookMark } from "./entities/book_mark.entity";
import { CreateBookMarkDto } from "./dto/create-book_mark.dto";
import { UpdateBookMarkDto } from "./dto/update-book_mark.dto";

@Injectable()
export class BookMarksService {
  constructor(
    @InjectModel(BookMark) private readonly bookMarkModel: typeof BookMark
  ) {}

  async create(createBookMarkDto: CreateBookMarkDto) {
    return this.bookMarkModel.create(createBookMarkDto);
  }

  async findAll() {
    return this.bookMarkModel.findAll();
  }

  async findOne(id: number) {
    return this.bookMarkModel.findByPk(id)
  }

  async update(id: number, updateBookMarkDto: UpdateBookMarkDto) {
    return this.bookMarkModel.update(updateBookMarkDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.bookMarkModel.destroy({ where: { id } });

    return { message: "BookMark deleted successfully" };
  }
}
