import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entities/user.entity";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { GenreModule } from "./genre/genre.module";
import { LanguagesModule } from "./languages/languages.module";
import { AuthorsModule } from "./authors/authors.module";
import { CategoriesModule } from "./categories/categories.module";
import { Author } from "./authors/entities/author.entity";
import { Genre } from "./genre/entities/genre.entity";
import { Language } from "./languages/entities/language.entity";
import { Category } from "./categories/entities/category.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [User, Author, Genre, Language, Category],
      autoLoadModels: true,
      logging: true,
      sync: { alter: true }, // force
    }),
    UsersModule,
    AuthModule,
    MailModule,
    GenreModule,
    LanguagesModule,
    AuthorsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
