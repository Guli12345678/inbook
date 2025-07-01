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
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { BotModule } from "./bot/bot.module";
import { BookVersionModule } from "./book_version/book_version.module";
import { AudioBookModule } from "./audio_book/audio_book.module";
import { BooksModule } from "./books/books.module";
import { BookVersion } from "./book_version/entities/book_version.entity";
import { Book } from "./books/entities/book.entity";
import { AudioBook } from "./audio_book/entities/audio_book.entity";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
        include: [BotModule],
      }),
    }),
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
      models: [
        User,
        Author,
        Genre,
        Language,
        Category,
        BookVersion,
        Book,
        AudioBook,
      ],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true }, // force
    }),
    UsersModule,
    AuthModule,
    MailModule,
    GenreModule,
    LanguagesModule,
    AuthorsModule,
    CategoriesModule,
    BotModule,
    BookVersionModule,
    AudioBookModule,
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
