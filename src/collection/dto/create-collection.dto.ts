import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateCollectionDto {
  @ApiProperty({ example: "My Collection", description: "Collection title" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "A collection of books",
    description: "Description of the collection",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "Cover image URL",
    required: false,
  })
  @IsString()
  @IsOptional()
  coverImageUrl: string;

  @ApiProperty({
    example: 1,
    description: "ID of the user who created the collection",
  })
  @IsInt()
  @IsNotEmpty()
  createdBy: number;

  @ApiProperty({ example: true, description: "Is the collection public?" })
  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;

  @ApiProperty({ example: false, description: "Is the collection premium?" })
  @IsBoolean()
  @IsNotEmpty()
  isPremium: boolean;
}
