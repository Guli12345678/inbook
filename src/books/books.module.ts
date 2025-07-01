import { forwardRef, Module } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Book } from "./entities/book.entity";
import { AuthorsModule } from "../authors/authors.module";
import { BookVersionModule } from "../book_version/book_version.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Book]),
    forwardRef(() => AuthorsModule),
    forwardRef(() => BookVersionModule),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
