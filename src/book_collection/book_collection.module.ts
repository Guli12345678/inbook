import { Module } from "@nestjs/common";
import { BookCollectionService } from "./book_collection.service";
import { BookCollectionController } from "./book_collection.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { BookCollection } from "./entities/book_collection.entity";
import { Collection } from "../collection/entities/collection.entity";
import { Book } from "../books/entities/book.entity";

@Module({
  imports: [SequelizeModule.forFeature([BookCollection, Collection, Book])],
  controllers: [BookCollectionController],
  providers: [BookCollectionService],
})
export class BookCollectionModule {}
