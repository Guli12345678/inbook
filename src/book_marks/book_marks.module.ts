import { Module } from "@nestjs/common";
import { BookMarksService } from "./book_marks.service";
import { BookMarksController } from "./book_marks.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { BookMark } from "./entities/book_mark.entity";

@Module({
  imports: [SequelizeModule.forFeature([BookMark])],
  controllers: [BookMarksController],
  providers: [BookMarksService],
})
export class BookMarksModule {}
