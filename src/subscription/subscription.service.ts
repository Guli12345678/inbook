import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Subscription } from "./entities/subscription.entity";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription)
    private readonly subscriptionModel: typeof Subscription
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionModel.create(createSubscriptionDto);
  }

  async findAll() {
    return this.subscriptionModel.findAll();
  }

  async findOne(userId: number) {
    const subscription = await this.subscriptionModel.findByPk(userId);
    if (!subscription) throw new NotFoundException("Subscription not found");
    return subscription;
  }

  async update(userId: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.subscriptionModel.findByPk(userId);
    if (!subscription) throw new NotFoundException("Subscription not found");
    return subscription.update(updateSubscriptionDto);
  }

  async remove(userId: number) {
    const subscription = await this.subscriptionModel.findByPk(userId);
    if (!subscription) throw new NotFoundException("Subscription not found");
    await subscription.destroy();
    return { message: "Subscription deleted successfully" };
  }
}
