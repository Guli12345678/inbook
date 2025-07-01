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

interface IBookCreationId {
  published_year: Date;
  authorId: number;
}

@Table({ tableName: "book" })
export class Book extends Model<Book, IBookCreationId> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @Column({
    type: DataType.DATEONLY,
  })
  declare published_year: Date;

  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
  })
  declare authorId: number;

  @HasMany(() => BookVersion)
  book_versions: BookVersion[];

  @BelongsTo(() => Author)
  author: Author;
}
