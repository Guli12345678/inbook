import { Module, forwardRef } from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { AuthorsController } from "./authors.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Author } from "./entities/author.entity";
import { BooksModule } from "../books/books.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Author]),
    forwardRef(() => BooksModule),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
