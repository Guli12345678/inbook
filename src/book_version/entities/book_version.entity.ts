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
import { ApiProperty } from "@nestjs/swagger";

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
  @ApiProperty({ example: 1, description: "BookVersion ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @ApiProperty({ example: 1, description: "Book ID" })
  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
  })
  declare bookId: number;
  @ApiProperty({ example: 1, description: "Language ID" })
  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
  })
  declare languageId: number;
  @ApiProperty({ example: "Title", description: "Book version title" })
  @Column({
    type: DataType.STRING,
  })
  declare title: string;
  @ApiProperty({
    example: "Description",
    description: "Book version description",
  })
  @Column({
    type: DataType.STRING,
  })
  declare description: string;
  @ApiProperty({
    example: "http://example.com/text.pdf",
    description: "Text URL",
  })
  @Column({
    type: DataType.STRING,
  })
  declare text_url: string;
  @ApiProperty({
    example: "http://example.com/cover.jpg",
    description: "Cover URL",
  })
  @Column({
    type: DataType.STRING,
  })
  declare cover_url: string;

  @ApiProperty({ type: () => Book, description: "Book" })
  @BelongsTo(() => Book)
  book: Book;

  @ApiProperty({ type: () => Language, description: "Language" })
  @BelongsTo(() => Language)
  language: Language;

  @ApiProperty({ type: () => [AudioBook], description: "Audio books" })
  @HasMany(() => AudioBook)
  audio_books: AudioBook[];
}
