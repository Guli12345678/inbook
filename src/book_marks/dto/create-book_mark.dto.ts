import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateBookMarkDto {
  @ApiProperty({ example: 1, description: "User ID" })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 2, description: "Book ID" })
  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @ApiProperty({
    example: "Interesting note",
    description: "Note about the bookmark",
    required: false,
  })
  @IsString()
  @IsOptional()
  note: string;

  @ApiProperty({
    example: "Page 42",
    description: "Bookmark position",
    required: false,
  })
  @IsString()
  @IsOptional()
  position: string;
}
