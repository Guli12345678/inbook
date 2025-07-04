import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Library } from "./models/library.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Bot } from "../models/bot.model";
@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library) private readonly libraryModel: typeof Library,
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async onLibrary(ctx: Context) {
    try {
      await ctx.replyWithHTML("Kerakli menuni tanlang: ", {
        ...Markup.keyboard([
          ["Yangi kutubxona qo'shish", "Barcha kutubxonalar"],
        ]).resize(),
      });
    } catch (error) {
      console.log(
        `Error happening on the method named onLibrary. Go to library service`,
        error
      );
    }
  }
  async addNewLibrary(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Siz avval ro'yxatdan o'tmagansiz ❌`, {
          ...Markup.removeKeyboard(),
        });
      } else {
        await this.libraryModel.create({
          user_id: user_id!,
          last_state: "name",
        });
        await ctx.replyWithHTML("Yangi kutubxona nomini kiriting:  ", {
          ...Markup.removeKeyboard(),
        });
      }
    } catch (error) {
      console.log(
        `Error happening on the method named onLibrary. Go to library service`,
        error
      );
    }
  }
}
