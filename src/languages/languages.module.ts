import { Module } from "@nestjs/common";
import { LanguagesService } from "./languages.service";
import { LanguagesController } from "./languages.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Language } from "./entities/language.entity";

@Module({
  imports: [SequelizeModule.forFeature([Language])],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
