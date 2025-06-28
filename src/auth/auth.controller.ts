import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "../users/dto/sign-user.dto";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { SignInAdminDto } from "../admins/dto/sign-admin.dto";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @HttpCode(200)
  @Post("signin")
  signin(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signin(signInUserDto, res);
  }

  @Post("admin-signup")
  adminSignup(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.adminSignUp(createAdminDto);
  }

  @HttpCode(200)
  @Post("admin-signin")
  adminSignin(
    @Body() signInAdminDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.adminSignIn(signInAdminDto, res);
  }

  @Post("admin-signout")
  adminSignout(@Res({ passthrough: true }) res: Response) {
    return this.authService.adminSignOut(res);
  }

  @Post("admin-refresh")
  adminRefresh(
    @Body("adminId") adminId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.adminRefresh(adminId, res);
  }

  @Post("admin-activate")
  adminActivate(@Body("adminId") adminId: number) {
    return this.authService.adminActivate(adminId);
  }

  @Post("signout")
  signout(@Res({ passthrough: true }) res: Response) {
    return this.authService.signOut(res);
  }

  @Post("refresh")
  refresh(
    @Body("userId") userId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refresh(userId, res);
  }

  @Post("activate")
  activate(@Body("activation_link") activation_link: string) {
    return this.authService.activate(activation_link);
  }
}
