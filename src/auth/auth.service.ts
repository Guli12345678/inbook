import {
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { SignInUserDto } from "../users/dto/sign-user.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { MailService } from "../mail/mail.service";
import { Admin } from "../admins/entities/admin.entity";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { AdminsService } from "../admins/admins.service";
import { SignInAdminDto } from "../admins/dto/sign-admin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly adminsService: AdminsService
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_premium: user.is_premium,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.SECRET_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.findUserByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException("This user already exists");
    }

    const newUser = await this.usersService.create(createUserDto);
    //sendMail

    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Service da xatolik");
    }

    return {
      message:
        "Ro'yxatdan o'tdingiz. Akkauntni faollashtirish uchun emailni tasdiqlang",
    };
  }
  async signin(signinUserDto: SignInUserDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signinUserDto.email);
    if (!user) {
      throw new UnauthorizedException("Email or password is incorrect!");
    }
    const validPassword = await bcrypt.compare(
      signinUserDto.password,
      user.password
    );
    if (!validPassword) {
      throw new UnauthorizedException("Email or password is incorrect!");
    }
    const { accessToken, refreshToken } = await this.generateTokens(user);

    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: "User signed in",
      id: user.id,
      accessToken,
    };
  }

  async signOut(res: Response) {
    res.clearCookie("refreshToken");
    return { message: "User signed out" };
  }

  async refresh(userId: number, res: Response) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const { accessToken, refreshToken } = await this.generateTokens(user);
    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return {
      accessToken,
    };
  }

  async activate(activation_link: string) {
    const user =
      await this.usersService.findUserByActivationLink(activation_link);
    if (!user) {
      throw new UnauthorizedException("Activation link is invalid");
    }
    user.is_active = true;
    await user.save();
    return { message: "User activated" };
  }

  async adminGenerateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
        expiresIn: process.env.ADMIN_SECRET_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
        expiresIn: process.env.ADMIN_REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async adminSignUp(createAdminDto: CreateAdminDto) {
    const admin = await this.adminsService.findAdminByEmail(
      createAdminDto.email
    );
    if (admin) {
      throw new ConflictException("This admin already exists");
    }
    const newAdmin = await this.adminsService.create(createAdminDto);
    return {
      message: "Admin registered successfully.",
      id: newAdmin.id,
    };
  }

  async adminSignIn(signInAdminDto: SignInAdminDto, res: Response) {
    const admin = await this.adminsService.findAdminByEmail(
      signInAdminDto.email
    );
    if (!admin) {
      throw new UnauthorizedException("Email or password is incorrect!");
    }
    const validPassword = await bcrypt.compare(
      signInAdminDto.password,
      admin.password
    );
    if (!validPassword) {
      throw new UnauthorizedException("Email or password is incorrect!");
    }
    const { accessToken, refreshToken } = await this.adminGenerateTokens(admin);
    res.cookie("adminRefreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return {
      message: "Admin signed in",
      id: admin.id,
      accessToken,
    };
  }

  async adminSignOut(res: Response) {
    res.clearCookie("adminRefreshToken");
    return { message: "Admin signed out" };
  }

  async adminRefresh(adminId: number, res: Response) {
    const admin = await this.adminsService.findOne(adminId);
    if (!admin) {
      throw new UnauthorizedException("Admin not found");
    }
    const { accessToken, refreshToken } = await this.adminGenerateTokens(admin);
    res.cookie("adminRefreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return {
      accessToken,
    };
  }

  async adminActivate(adminId: number) {
    const admin = await this.adminsService.findOne(adminId);
    if (!admin) {
      throw new UnauthorizedException("Admin not found");
    }
    admin.is_active = true;
    await admin.save();
    return { message: "Admin activated" };
  }
}
