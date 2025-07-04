import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../../users/entities/user.entity";
import { Book } from "../../books/entities/book.entity";

interface IBookMarkCreationAttr {
  userId: number;
  bookId: number;
  note: string;
  position: string;
}

@Table({ tableName: "book_marks" })
export class BookMark extends Model<BookMark, IBookMarkCreationAttr> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  userId: number;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  bookId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Book)
  book: Book;

  @Column({ type: DataType.TEXT, allowNull: true })
  note: string;

  @Column({ type: DataType.STRING, allowNull: true })
  position: string;
}
