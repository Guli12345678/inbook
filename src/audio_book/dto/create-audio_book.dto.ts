import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAudioBookDto {
  @ApiProperty({ example: 1, description: "BookVersion ID" })
  @IsNumber()
  @IsNotEmpty()
  book_versionId: number;

  @ApiProperty({ example: "John Doe", description: "Narrator name" })
  @IsString()
  @IsNotEmpty()
  narrator_name: string;

  @ApiProperty({ example: 3600, description: "Total duration in seconds" })
  @IsNumber()
  @IsNotEmpty()
  total_duration: number;

  @ApiProperty({ example: "123.45", description: "Total size in MB" })
  @IsString()
  @IsNotEmpty()
  total_size_mb: string;
}
