import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { ConfigModule } from "@nestjs/config";
import { MailService } from "../mail/mail.service";
import { MailModule } from "../mail/mail.module";
import { AdminsModule } from "../admins/admins.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    JwtModule.register({}),
    UsersModule,
    MailModule,
    AdminsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
