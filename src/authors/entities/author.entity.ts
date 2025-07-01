import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAuthorCreationAttr {
  full_name: string;
  bio: string;
  photo_url: string;
}

@Table({ tableName: "author" })
export class Author extends Model<Author, IAuthorCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @Column({
    type: DataType.STRING,
  })
  declare full_name: string;
  @Column({
    type: DataType.STRING,
  })
  declare bio: string;
  @Column({
    type: DataType.STRING,
  })
  declare photo_url: string;
}
