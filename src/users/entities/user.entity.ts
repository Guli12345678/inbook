import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { Collection } from "../../collection/entities/collection.entity";
import { BookMark } from "../../book_marks/entities/book_mark.entity";
import { Subscription } from "../../subscription/entities/subscription.entity";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  password: string;
  gender: string;
  birth_year: number;
  phone: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @ApiProperty({
    example: "user1",
    description: "This includes user's name",
  })
  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: true,
  })
  declare full_name: string;
  @ApiProperty({
    example: "user1@mail.uz",
    description: "This includes user's email",
  })
  @Column({
    type: DataType.STRING(30),
    unique: true,
  })
  declare email: string;
  @ApiProperty({
    example: "G!@#$1234g",
    description: "This includes user's password",
  })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;
  @ApiProperty({
    example: "G!@#$1234g",
    description: "This includes user's gender",
  })
  @Column({
    type: DataType.ENUM("erkak", "ayol"),
  })
  declare gender: string;
  @ApiProperty({
    example: "user",
    description: "This includes user's situation",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;
  @ApiProperty({
    example: "user",
    description: "This includes user's premium existence",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_premium: boolean;
  @ApiProperty({
    example: "user",
    description: "This includes user's premium activation_link",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;
  @ApiProperty({
    example: "user",
    description: "This includes user's premium activation_link",
  })
  @Column({
    type: DataType.STRING,
  })
  declare refresh_token: string;
  @ApiProperty({
    example: "user",
    description: "This includes user's premium phone",
  })
  @Column({
    type: DataType.STRING(20),
  })
  declare phone: string;
  @ApiProperty({
    example: "user",
    description: "This includes user's birth_date",
  })
  @Column({
    type: DataType.SMALLINT,
  })
  declare birth_year: number;

  @HasMany(() => Collection, "createdBy")
  collections: Collection[];

  @HasMany(() => BookMark)
  bookMarks: BookMark[];

  @HasMany(() => Subscription)
  subscriptions: Subscription[];
}
