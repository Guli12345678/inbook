import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { User } from "../../users/entities/user.entity";
import { BookCollection } from "../../book_collection/entities/book_collection.entity";

interface ICollectionCreationAttr {
  title: string;
  description: string;
  coverImageUrl: string;
  createdBy: number;
  isPublic: boolean;
  isPremium: boolean;
}

@Table({ tableName: "collection" })
export class Collection extends Model<Collection, ICollectionCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare description: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare coverImageUrl: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare createdBy: number;

  @BelongsTo(() => User)
  creator: User;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare isPublic: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare isPremium: boolean;

  @HasMany(() => BookCollection)
  bookCollections: BookCollection[];
}
