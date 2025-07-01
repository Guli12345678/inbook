import { forwardRef, Module } from "@nestjs/common";
import { LanguagesService } from "./languages.service";
import { LanguagesController } from "./languages.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Language } from "./entities/language.entity";
import { BookVersionModule } from "../book_version/book_version.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Language]),
    forwardRef(() => BookVersionModule),
  ],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
