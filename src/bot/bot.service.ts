import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { AddMinutesToDate } from "../common/helpers/addMinutes";
import { Otp } from "../users/entities/otp.model";
import { PhoneUserDto } from "../users/dto/phone-user.dto";
import { Library } from "./library/models/library.model";
import { Op } from "sequelize";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Library) private readonly libraryModel: typeof Library,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async start(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await this.botModel.create({
          user_id: user_id!,
          username: ctx.from!.username!,
          first_name: ctx.from!.first_name!,
          last_name: ctx.from!.last_name!,
          language_code: ctx.from!.language_code!,
        });

        await ctx.replyWithHTML(
          `Iltimos, Akkauntni faollashtirish uchun <b> 📞 Telefon raqamni yuborish</b> tugmasini bosing!`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("📞 Telefon raqamni yuborish")],
            ]).resize(),
          }
        );
      } else if (!user.status) {
        await ctx.replyWithHTML(
          `Iltimos, Akkauntni faollashtirish uchun <b>📞 Telefon raqamni yuborish</b> tugmasini bosing!`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("📞 Telefon raqamni yuborish")],
            ]).resize(),
          }
        );
      } else {
        await ctx.replyWithHTML(
          `Ushbu Bot InBook Premium foydalanuvchilari uchun kitob izlash imkonini beradi!`,
          {
            ...Markup.keyboard([["📚 Kutubxona", "📖 Kitob"]]).resize(),
          }
        );
      }
    } catch (error) {
      console.log(
        `Error on start method. If you want to handle this ${error} GO TO BOT SERVICE`
      );
    }
  }

  async onContact(ctx: Context) {
    try {
      if ("contact" in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);

        if (!user) {
          await ctx.replyWithHTML(`Iltimos, <b>/start</b> tugmasini bosing!`, {
            ...Markup.keyboard([
              [Markup.button.contactRequest("/start")],
            ]).resize(),
          });
        } else if (ctx.message.contact.user_id != user_id) {
          await ctx.replyWithHTML(
            `Iltimos, o'zingizni  telefon raqamingizni yuboring!`,
            {
              ...Markup.keyboard([
                [Markup.button.contactRequest("📞 Telefon raqamni yuborish")],
              ]).resize(),
            }
          );
        } else {
          user.phone_number = ctx.message.contact.phone_number;
          user.status = true;
          await user.save();

          await ctx.replyWithHTML(`Tabriklayman 🎉. Akkaunt faollashtirildi`, {
            ...Markup.removeKeyboard(),
          });
        }
      }
    } catch (error) {
      console.log(
        `Error happening on bot service on the method named onContact: ${error}`
      );
    }
  }

  async onStop(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Siz avval ro'yxatdan o'tmagansiz ❌`, {
          ...Markup.removeKeyboard(),
        });
      } else if (user.status) {
        user.status = false;

        user.phone_number = "";

        await user.save();

        await ctx.replyWithHTML(
          `Siz vaqtincha botdan chiqib ketdingiz! Qayta faollashtirish uchun <b>/start</b> tugmasini bosing`,
          {
            ...Markup.keyboard([["/start"]]).resize(),
          }
        );
      }
    } catch (error) {
      console.log(
        `Error is happening in the botservice in the method named onStop. Go to bot srevice`,
        error
      );
    }
  }

  async sendOtp(
    phone_number: string,
    OTP: string
  ): Promise<boolean | undefined> {
    try {
      const user = await this.botModel.findOne({ where: { phone_number } });
      if (!user || !user.status) {
        return false;
      }

      // const now = new Date();
      // const expiration_time = AddMinutesToDate(now, 5);
      // await this.otpModel.destroy({ where: { phone_number } })
      // const dbOtp = await this.otpModel.create({
      //   otp, expiration_time, phone_number
      // })

      await this.bot.telegram.sendMessage(user.user_id, `verify code: ${OTP}`);

      return true;
    } catch (error) {
      console.log(
        `Error happening on sendOtp method. To hande this issue, go to bot service`,
        error
      );
    }
  }
  async onText(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Siz avval ro'yxatdan o'tmagansiz ❌`, {
          ...Markup.removeKeyboard(),
        });
      } else {
        if ("text" in ctx.message!) {
          const library = await this.libraryModel.findOne({
            where: { user_id, last_state: { [Op.ne]: "finish" } },
            order: [["id", "DESC"]],
          });
          if (library) {
            const userInputText = ctx.message.text;
            switch (library.last_state) {
              case "name":
                library.name = userInputText;
                library.last_state = "address";
                await library.save();
                await ctx.replyWithHTML("Kutubxona manzilini kiriting:");
                break;
              case "address":
                library.address = userInputText;
                library.last_state = "location";
                await library.save();
                await ctx.replyWithHTML("Kutubxona lokatsiyasini kiriting:", {
                  ...Markup.keyboard([
                    [Markup.button.locationRequest("Manzil tanla")],
                  ]).resize(),
                });
                break;
              case "phone_number":
                library.phone = userInputText;
                library.last_state = "finish";
                await library.save();
                await ctx.replyWithHTML("Kutubxona yaratildi! ", {
                  ...Markup.keyboard([
                    ["Yangi kutubxona qo'shish", "Barcha kutubxonalar"],
                  ]).resize(),
                });
                break;

              default:
                break;
            }
          }
        }
      }
    } catch (error) {
      console.log(
        `Error happening on sendOtp method. To hande this issue, go to bot service`,
        error
      );
    }
  }
  async onLocation(ctx: Context) {
    try {
      if ("location" in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);

        if (!user) {
          await ctx.replyWithHTML(`Siz avval ro'yxatdan o'tmagansiz ❌`, {
            ...Markup.removeKeyboard(),
          });
        } else {
          const library = await this.libraryModel.findOne({
            where: { user_id, last_state: "location" },
            order: [["id", "DESC"]],
          });
          if (library) {
            library.location =
              ctx.message.location.latitude +
              "|" +
              ctx.message.location.longitude;

            library.last_state = "phone_number";
            await library.save();
            await ctx.replyWithHTML(
              "Kutubxona telefonini kiriting: (misol: 90-999-99-99)",
              {
                ...Markup.removeKeyboard(),
              }
            );
          }
        }
        await ctx.replyWithLocation(
          ctx.message.location.latitude,
          ctx.message.location.longitude
        );
      }
    } catch (error) {
      console.log(`Error on location`);
    }
  }
}
