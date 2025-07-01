import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { AudioBook } from "../../audio_book/entities/audio_book.entity";
import { ApiProperty } from "@nestjs/swagger";

interface IAudioPartsCreationAttr {
  audio_bookId: number;
  title: string;
  file_url: string;
  duration: number;
  size_mb: string;
  order_index: number;
}

@Table({ tableName: "audio_parts" })
export class AudioPart extends Model<AudioPart, IAudioPartsCreationAttr> {
  @ApiProperty({ example: 1, description: "AudioPart ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "Chapter 1", description: "Title of the audio part" })
  @Column({
    type: DataType.STRING,
  })
  declare title: string;

  @ApiProperty({
    example: "http://example.com/audio.mp3",
    description: "File URL",
  })
  @Column({
    type: DataType.STRING,
  })
  declare file_url: string;

  @ApiProperty({ example: 300, description: "Duration in seconds" })
  @Column({
    type: DataType.INTEGER,
  })
  declare duration: number;

  @ApiProperty({ example: "12.34", description: "Size in MB" })
  @Column({
    type: DataType.DECIMAL(8, 2),
  })
  declare size_mb: string;

  @ApiProperty({ example: 1, description: "AudioBook ID" })
  @ForeignKey(() => AudioBook)
  @Column({
    type: DataType.INTEGER,
  })
  declare audio_bookId: number;

  @ApiProperty({ example: 1, description: "Order index" })
  @Column({
    type: DataType.INTEGER,
  })
  declare order_index: number;

  @ApiProperty({ type: () => AudioBook, description: "AudioBook" })
  @BelongsTo(() => AudioBook)
  audio_book: AudioBook;
}
