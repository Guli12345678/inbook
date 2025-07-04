import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Book } from "../../books/entities/book.entity";
import { Collection } from "../../collection/entities/collection.entity";

interface IBookCollectionCreationAttr {
  collectionId: number;
  bookId: number;
}

@Table({ tableName: "book_collection" })
export class BookCollection extends Model<
  BookCollection,
  IBookCollectionCreationAttr
> {
  @ForeignKey(() => Collection)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  declare collectionId: number;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  declare bookId: number;

  @BelongsTo(() => Collection)
  collection: Collection;

  @BelongsTo(() => Book)
  book: Book;
}
