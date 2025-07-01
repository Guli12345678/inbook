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
import { ApiProperty } from "@nestjs/swagger";
import { AudioPart } from "../../audio_parts/entities/audio_part.entity";

interface IAudioBookCreationAttr {
  book_versionId: number;
  narrator_name: string;
  total_duration: number;
  total_size_mb: string;
}

@Table({ tableName: "audio_book" })
export class AudioBook extends Model<AudioBook, IAudioBookCreationAttr> {
  @ApiProperty({ example: 1, description: "AudioBook ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 1, description: "BookVersion ID" })
  @ForeignKey(() => BookVersion)
  @Column({
    type: DataType.INTEGER,
  })
  declare book_versionId: number;

  @ApiProperty({ example: "John Doe", description: "Narrator name" })
  @Column({
    type: DataType.STRING,
  })
  declare narrator_name: string;

  @ApiProperty({ example: 3600, description: "Total duration in seconds" })
  @Column({
    type: DataType.INTEGER,
  })
  declare total_duration: number;

  @ApiProperty({ example: "123.45", description: "Total size in MB" })
  @Column({
    type: DataType.DECIMAL(8, 2),
  })
  declare total_size_mb: string;

  @ApiProperty({ type: () => BookVersion, description: "Book version" })
  @BelongsTo(() => BookVersion)
  book_version: BookVersion;

  @HasMany(() => AudioPart)
  audio_parts: AudioPart;
}
