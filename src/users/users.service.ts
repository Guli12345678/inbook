import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";
import * as otpGenerator from "otp-generator";

import * as bcrypt from "bcrypt";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { BotService } from "../bot/bot.service";
import { Otp } from "./entities/otp.model";
import { AddMinutesToDate } from "../common/helpers/addMinutes";
import { timestamp } from "rxjs";
import { decode, encode } from "../common/helpers/crypto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly botService: BotService,
    @InjectModel(Otp) private readonly otpModel: typeof Otp
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parol mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashed_password,
    }); //sendMail
    return newUser;
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  findUserByActivationLink(activation_link: string) {
    return this.userModel.findOne({ where: { activation_link } });
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const user = await this.userModel.update(
      { refresh_token },
      {
        where: { id },
      }
    );
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }

  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const isSend = await this.botService.sendOtp(phone_number, otp);

    if (!isSend) {
      throw new BadRequestException("Avval botdan ro'yxatdan o'ting");
    }

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });
    const dbOtp = await this.otpModel.create({
      otp,
      expiration_time,
      phone_number,
    });

    const details = {
      timestamp: now,
      phone_number,
      otp_id: dbOtp.id,
    };

    const encodedData = await encode(JSON.stringify(details));

    return {
      message: "OTP botga yuborildi ✅",
      verification_key: encodedData,
    };
  }
  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { phone, verification_key, otp } = verifyOtpDto;

    const decodedData = await decode(verification_key);

    const details = JSON.parse(decodedData);

    if (details.phone_number != phone) {
      throw new BadRequestException("OTP bu telefon raqamga yuborilmagan! ");
    }

    const resultOtp = await this.otpModel.findOne({
      where: { id: details.otp_id },
    });

    if (resultOtp == null) {
      throw new BadRequestException("Bunday otp mavjud emas! ");
    }

    if (resultOtp.verified) {
      throw new BadRequestException("Bu otp avval tekshirilgan! ");
    }

    if (resultOtp.expiration_time < new Date()) {
      throw new BadRequestException("Bu otp eskirgan! ");
    }

    if (otp != resultOtp.otp) {
      throw new BadRequestException("Bu otp mos emas! ");
    }

    const user = await this.userModel.update(
      {
        is_premium: true,
      },
      {
        where: { phone },
        returning: true,
      }
    );

    if (!user[1][0]) {
      throw new BadRequestException("Bunday user mavjud emas!");
    }

    resultOtp.verified = true;

    await resultOtp.save();

    return {
      message: "Tabriklaymiz 🎉! Siz premium user boldingiz!",
      user: user[1][0],
    };
  }
}
