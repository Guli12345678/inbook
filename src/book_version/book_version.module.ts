import { forwardRef, Module } from "@nestjs/common";
import { BookVersionService } from "./book_version.service";
import { BookVersionController } from "./book_version.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { BookVersion } from "./entities/book_version.entity";
import { AudioBookModule } from "../audio_book/audio_book.module";
import { LanguagesModule } from "../languages/languages.module";
import { BooksModule } from "../books/books.module";

@Module({
  imports: [
    SequelizeModule.forFeature([BookVersion]),
    forwardRef(() => AudioBookModule),
    forwardRef(() => LanguagesModule),
    forwardRef(() => BooksModule),
  ],
  controllers: [BookVersionController],
  providers: [BookVersionService],
})
export class BookVersionModule {}
