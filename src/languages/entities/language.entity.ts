import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { BookVersion } from "../../book_version/entities/book_version.entity";

interface ILanguageCreationAttr {
  code: string;
  name: string;
  flag: string;
}

@Table({ tableName: "language" })
export class Language extends Model<Language, ILanguageCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @Column({
    type: DataType.STRING,
  })
  declare code: string;
  @Column({
    type: DataType.STRING,
  })
  declare name: string;
  @Column({
    type: DataType.STRING,
  })
  declare flag: string;

  @HasMany(() => BookVersion)
  book_version: BookVersion;
}
