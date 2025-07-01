import { forwardRef, Module } from "@nestjs/common";
import { AudioBookService } from "./audio_book.service";
import { AudioBookController } from "./audio_book.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { AudioBook } from "./entities/audio_book.entity";
import { BookVersionModule } from "../book_version/book_version.module";
import { AudioPart } from "../audio_parts/entities/audio_part.entity";

@Module({
  imports: [
    SequelizeModule.forFeature([AudioBook, AudioPart]),
    forwardRef(() => BookVersionModule),
  ],
  controllers: [AudioBookController],
  providers: [AudioBookService],
})
export class AudioBookModule {}
