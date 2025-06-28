import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  full_name: string;
  email: string;
  password: string;
  is_creator: boolean;
  is_active: boolean;
}

@Table({ tableName: "admins" })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "admin1",
    description: "Admin's name",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare full_name: string;

  @ApiProperty({
    example: "admin1@mail.com",
    description: "Admin's email",
  })
  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @ApiProperty({
    example: "123qwe!",
    description: "Admin's password",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ApiProperty({
    example: true,
    description: "Admin's situation",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_creator: boolean;

  @ApiProperty({
    example: true,
    description: " Admin's situation",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;
}
