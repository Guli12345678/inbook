import { Module } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { GenreController } from "./genre.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Genre } from "./entities/genre.entity";

@Module({
  imports: [SequelizeModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
