import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../../users/entities/user.entity";

interface ISubscriptionCreationAttr {
  userId: number;
  startDate: Date;
  endDate: Date;
}

@Table({ tableName: "subscription" })
export class Subscription extends Model<
  Subscription,
  ISubscriptionCreationAttr
> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.DATE, allowNull: false })
  startDate: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  endDate: Date;
}
