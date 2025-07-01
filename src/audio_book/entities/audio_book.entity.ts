import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { BookVersion } from "../../book_version/entities/book_version.entity";

interface IAudioBookCreationAttr {
  book_versionId: number;
  narrator_name: string;
  total_duration: number;
  total_size_mb: string;
}
  
@Table({ tableName: "audio_book" })
export class AudioBook extends Model<AudioBook, IAudioBookCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => BookVersion)
  @Column({
    type: DataType.INTEGER,
  })
  declare book_versionId: number;
  @Column({
    type: DataType.STRING,
  })
  declare narrator_name: string;
  @Column({
    type: DataType.INTEGER,
  })
  declare total_duration: number;
  @Column({
    type: DataType.DECIMAL(8, 2),
  })
  declare total_size_mb: string;

  @BelongsTo(() => BookVersion)
  book_version: BookVersion;
}
