import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotUpddate } from "./bot.update";

@Module({
  controllers: [],
  providers: [BotService, BotUpddate],
})
export class BotModule {}
