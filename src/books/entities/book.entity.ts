import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { BookVersion } from "../../book_version/entities/book_version.entity";
import { Author } from "../../authors/entities/author.entity";
import { ApiProperty } from "@nestjs/swagger";

interface IBookCreationId {
  published_year: Date;
  authorId: number;
}

@Table({ tableName: "book" })
export class Book extends Model<Book, IBookCreationId> {
  @ApiProperty({ example: 1, description: "Book ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "2023-01-01", description: "Published year (date)" })
  @Column({
    type: DataType.DATEONLY,
  })
  declare published_year: Date;

  @ApiProperty({ example: 1, description: "Author ID" })
  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
  })
  declare authorId: number;

  @ApiProperty({ type: () => [BookVersion], description: "Book versions" })
  @HasMany(() => BookVersion)
  book_versions: BookVersion[];

  @ApiProperty({ type: () => Author, description: "Author" })
  @BelongsTo(() => Author)
  author: Author;
}
