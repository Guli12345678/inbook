import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>("smtp_host"),
          secure: false,
          auth: {
            user: config.get<string>("smtp_user"),
            pass: config.get<string>("smtp_password"),
          },
          defaults: {
            from: `"Inbook" <${config.get<string>("smtp_user")}>`,
          },
          template: {
            dir: join(__dirname, "templates"),
            adapter: new HandlebarsAdapter(),
            template: "./test",
            options: {
              strict: true,
            },
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
