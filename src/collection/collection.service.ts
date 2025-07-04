import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Collection } from "./entities/collection.entity";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection) private readonly collectionModel: typeof Collection
  ) {}

  async create(createCollectionDto: CreateCollectionDto) {
    return this.collectionModel.create(createCollectionDto);
  }

  async findAll() {
    return this.collectionModel.findAll();
  }

  async findOne(id: number) {
    const collection = await this.collectionModel.findByPk(id);
    if (!collection) throw new NotFoundException("Collection not found");
    return collection;
  }

  async update(id: number, updateCollectionDto: UpdateCollectionDto) {
    const collection = await this.collectionModel.findByPk(id);
    if (!collection) throw new NotFoundException("Collection not found");
    return collection.update(updateCollectionDto);
  }

  async remove(id: number) {
    const collection = await this.collectionModel.findByPk(id);
    if (!collection) throw new NotFoundException("Collection not found");
    await collection.destroy();
    return { message: "Collection deleted successfully" };
  }
}
