import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty } from "class-validator";

export class CreateSubscriptionDto {
  @ApiProperty({ example: 1, description: "User ID" })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: "2024-01-01", description: "Start date" })
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: "2024-12-31", description: "End date" })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}
