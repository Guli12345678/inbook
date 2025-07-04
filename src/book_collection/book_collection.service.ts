import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BookCollection } from "./entities/book_collection.entity";
import { CreateBookCollectionDto } from "./dto/create-book_collection.dto";
import { UpdateBookCollectionDto } from "./dto/update-book_collection.dto";

@Injectable()
export class BookCollectionService {
  constructor(
    @InjectModel(BookCollection)
    private readonly bookCollectionModel: typeof BookCollection
  ) {}

  async create(createBookCollectionDto: CreateBookCollectionDto) {
    return this.bookCollectionModel.create(createBookCollectionDto);
  }

  async findAll() {
    return this.bookCollectionModel.findAll();
  }

  async findOne(id: number) {
    return this.bookCollectionModel.findByPk(id);
  }

  async update(id: number, updateBookCollectionDto: UpdateBookCollectionDto) {
    return this.bookCollectionModel.update(updateBookCollectionDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    const book_collection = await this.bookCollectionModel.destroy({
      where: { id },
    });
    return { message: "BookCollection deleted successfully", id };
  }
}
