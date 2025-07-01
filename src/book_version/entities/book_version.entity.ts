import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Book } from "../../books/entities/book.entity";
import { Language } from "../../languages/entities/language.entity";
import { AudioBook } from "../../audio_book/entities/audio_book.entity";

interface IBookVersionCreationAttr {
  bookId: number;
  languageId: number;
  title: string;
  description: string;
  text_url: string;
  cover_url: string;
}

@Table({ tableName: "book_version" })
export class BookVersion extends Model<BookVersion, IBookVersionCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
  })
  declare bookId: number;
  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
  })
  declare languageId: number;
  @Column({
    type: DataType.STRING,
  })
  declare title: string;
  @Column({
    type: DataType.STRING,
  })
  declare description: string;
  @Column({
    type: DataType.STRING,
  })
  declare text_url: string;
  @Column({
    type: DataType.STRING,
  })
  declare cover_url: string;

  @BelongsTo(() => Book)
  book: Book;

  @BelongsTo(() => Language)
  language: Language;

  @HasMany(() => AudioBook)
  audio_books: AudioBook[];
}
