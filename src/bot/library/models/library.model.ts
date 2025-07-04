import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ILibraryCreationAttr {
  user_id: number;
  last_state: string;
}

@Table({ tableName: "library" })
export class Library extends Model<Library, ILibraryCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @Column({
    type: DataType.BIGINT,
  })
  declare user_id: number;

  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;
  @Column({
    type: DataType.STRING,
  })
  declare address: string;
  @Column({
    type: DataType.STRING,
  })
  declare location: string;
  @Column({
    type: DataType.STRING,
  })
  declare phone: string;
  @Column({
    type: DataType.STRING,
  })
  declare last_state: string;
}
