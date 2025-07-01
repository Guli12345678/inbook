import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
  @ApiProperty({ example: "2023-01-01", description: "Published year (date)" })
  @IsDateString()
  @IsNotEmpty()
  published_year: Date;

  @ApiProperty({ example: 1, description: "Author ID" })
  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
