import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { SignInUserDto } from "../users/dto/sign-user.dto";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { MailService } from "../mail/mail.service";
import { AdminsService } from "../admins/admins.service";
import { Admin } from "../admins/entities/admin.entity";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { SignInAdminDto } from "../admins/dto/sign-admin.dto";
import { InjectModel } from "@nestjs/sequelize";

// npm install jsonwebtoken
// npm install --save-dev @types/jsonwebtoken

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly adminService: AdminsService,
    private readonly mailService: MailService,
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    @InjectModel(User) private readonly userModel: typeof User
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

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateTokensAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEYAdmin,
        expiresIn: process.env.SECRET_TOKEN_TIMEAdmin,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEYAdmin,
        expiresIn: process.env.REFRESH_TOKEN_TIMEAdmin,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signupAdmin(createAdminDto: CreateAdminDto) {
    const condidate = await this.adminService.findAdminByEmail(
      createAdminDto.email
    );
    if (condidate) {
      throw new ConflictException("admin already exists");
    }

    const newAdmin = await this.adminService.create(createAdminDto);
    //sendMail
    return newAdmin;
  }

  async signup(createuserDto: CreateUserDto) {
    const condidate = await this.usersService.findUserByEmail(
      createuserDto.email
    );
    if (condidate) {
      throw new ConflictException("user already exists");
    }

    const newUser = await this.usersService.create(createuserDto);
    //sendMail
    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("email da xatolik");
    }
    //
    return {
      message: `Ro'yhatdan o'tdingiz. Akkauntni faollashtirish uchun email ni tasdiqlang}`,
    };
    return newUser;
  }

  async signin(signInuserDto: SignInUserDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signInuserDto.email);
    if (!user) {
      throw new UnauthorizedException("email/parol notogri");
    }

    const validPassword = await bcrypt.compare(
      signInuserDto.password,
      user.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("email/parol mos kelmadi");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();

    res.cookie("refresh_token", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: "user signed in! 😸",
      id: user.id,
      accessToken,
      refreshToken,
    };
  }
  async signout(req: Request, res: Response) {
    try {
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token) {
        throw new BadRequestException("Refresh token is required");
      }
      const decoded: any = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_KEY!
      );
      const user = await this.userModel.findOne({ where: { id: decoded.id } });

      if (!user || !user.refresh_token) {
        console.log("User or their refresh_token is null");
        throw new UnauthorizedException("User has no stored refresh token");
      }
      // console.log("Raw token from cookie:", refresh_token);
      // console.log("Hashed token in DB:", user.refresh_token);

      const isMatch = await bcrypt.compare(refresh_token, user.refresh_token);
      if (!isMatch) {
        throw new UnauthorizedException("Invalid token");
      }
      user.refresh_token = "";
      await user.save();
      res.clearCookie("refresh_token", {
        httpOnly: true,
      });

      return { message: "Logged out successfully" };
    } catch (error) {
      console.error("Signout error:", error);
      throw new UnauthorizedException("Error occurred during logout", error);
    }
  }

  // async signOut2(refreshToken: string, res: Response) {
  //   const userData = await this.jwtService.verify(refreshToken, {
  //     secret: process.env.REFRESH_TOKEN_KEY,
  //   });
  //   await this.usersService.updateRefreshToken(userData.id, "");
  //   res.clearCookie("refreshToken");
  //   return {
  //     message: "User logged out successfully",
  //   };
  // }

  async signinAdmin(signInAdminDto: SignInAdminDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(
      signInAdminDto.email
    );
    if (!admin) {
      throw new UnauthorizedException("email/parol notogri");
    }

    const validPassword = await bcrypt.compare(
      signInAdminDto.password,
      admin.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("email/parol mos kelmadi");
    }

    const { accessToken, refreshToken } = await this.generateTokensAdmin(admin);

    admin.refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();

    res.cookie("refresh_token", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: "admin signed in! 😸",
      id: admin.id,
      accessToken,
      refreshToken,
    };
  }

  async signoutAdmin(req: Request, res: Response) {
    try {
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token) {
        throw new BadRequestException("Refresh token is required");
      }
      const decoded: any = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_KEY!
      );
      const admin = await this.adminModel.findOne({
        where: { id: decoded.id },
      });

      if (!admin || !admin.refresh_token) {
        console.log("Admin or their refresh_token is null");
        throw new UnauthorizedException("Admin has no stored refresh token");
      }
      // console.log("Raw token from cookie:", refresh_token);
      // console.log("Hashed token in DB:", admin.refresh_token);

      const isMatch = await bcrypt.compare(refresh_token, admin.refresh_token);
      if (!isMatch) {
        throw new UnauthorizedException("Invalid token");
      }
      admin.refresh_token = "";
      await admin.save();
      res.clearCookie("refresh_token", {
        httpOnly: true,
      });

      return { message: "Logged out successfully" };
    } catch (error) {
      console.error("Signout error:", error);
      throw new UnauthorizedException("Error occurred during logout");
    }
  }

  async refreshUserToken(id: number, req: Request, res: Response) {
    const refresh_token = req.cookies?.refresh_token;
    if (!refresh_token) {
      throw new BadRequestException("Refresh token is required");
    }
    let decoded: any;
    try {
      decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_KEY!);
    } catch (err) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }
    // console.log(decoded);
    // console.log(id);
    const user = await this.userModel.findOne({ where: { id: decoded.id } });

    if (decoded.id !== id) {
      throw new UnauthorizedException(
        "user's id and id in parameter not match"
      );
    }

    if (!user || !user.refresh_token) {
      throw new UnauthorizedException("User not found or token missing");
    }

    const isMatch = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!isMatch) {
      throw new UnauthorizedException("Token mismatch");
    }

    const payload = { id: user.id };
    const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY!, {
      expiresIn: "15m",
    });

    const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY!, {
      expiresIn: "7d",
    });

    const hashedNewRefresh = await bcrypt.hash(newRefreshToken, 7);
    user.refresh_token = hashedNewRefresh;
    await user.save();

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return { message: "user refreshed", id: id, access_token: newAccessToken };
  }

  async refreshAdminToken(req: Request, res: Response) {
    const refresh_token = req.cookies?.refresh_token;

    if (!refresh_token) {
      throw new BadRequestException("Refresh token is required");
    }
    let decoded: any;
    try {
      decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_KEY!);
    } catch (err) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    const admin = await this.adminModel.findOne({ where: { id: decoded.id } });

    if (!admin || !admin.refresh_token) {
      throw new UnauthorizedException("User not found or token missing");
    }

    const isMatch = await bcrypt.compare(refresh_token, admin.refresh_token);
    if (!isMatch) {
      throw new UnauthorizedException("Token mismatch");
    }

    const payload = { id: admin.id };
    const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY!, {
      expiresIn: "15m",
    });

    const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY!, {
      expiresIn: "7d",
    });

    const hashedNewRefresh = await bcrypt.hash(newRefreshToken, 7);
    admin.refresh_token = hashedNewRefresh;
    await admin.save();

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { access_token: newAccessToken };
  }

  async activateUser(activationLink: string) {
    if (!activationLink) {
      throw new UnauthorizedException("Activation link is required");
    }

    const user = await this.userModel.findOne({
      where: { activation_link: activationLink },
    });

    if (!user) {
      throw new NotFoundException("Invalid activation link");
    }

    if (user.is_active) {
      throw new ConflictException("User account is already activated");
    }

    user.is_active = true;
    await user.save();

    return { message: "User account activated successfully" };
  }

  async activateAdmin(activationLink: string) {
    if (!activationLink) {
      throw new UnauthorizedException("Activation link is required");
    }

    const admin = await this.adminModel.findOne({
      where: { activation_link: activationLink },
    });

    if (!admin) {
      throw new NotFoundException("Invalid activation link");
    }

    if (admin.is_active) {
      throw new ConflictException("Admin account is already activated");
    }

    admin.is_active = true;
    await admin.save();

    return { message: "Admin account activated successfully" };
  }
}
