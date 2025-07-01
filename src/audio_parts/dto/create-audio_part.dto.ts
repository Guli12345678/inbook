import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAudioPartDto {
  @ApiProperty({ example: 1, description: "AudioBook ID" })
  @IsNumber()
  @IsNotEmpty()
  audio_bookId: number;

  @ApiProperty({ example: "Chapter 1", description: "Title of the audio part" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "http://example.com/audio.mp3",
    description: "File URL",
  })
  @IsString()
  @IsNotEmpty()
  file_url: string;

  @ApiProperty({ example: 300, description: "Duration in seconds" })
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({ example: "12.34", description: "Size in MB" })
  @IsString()
  @IsNotEmpty()
  size_mb: string;

  @ApiProperty({ example: 1, description: "Order index" })
  @IsNumber()
  @IsNotEmpty()
  order_index: number;
}
