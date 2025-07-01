import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Res,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "../users/dto/sign-user.dto";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { SignInAdminDto } from "../admins/dto/sign-admin.dto";
import { Response, Request } from "express";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "User signup" })
  @ApiResponse({ status: 201, description: "User registered" })
  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @ApiOperation({ summary: "User signin" })
  @ApiResponse({ status: 200, description: "User signed in" })
  @HttpCode(200)
  @Post("signin")
  signin(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signin(signInUserDto, res);
  }

  @ApiOperation({ summary: "Admin signup" })
  @ApiResponse({ status: 201, description: "Admin registered" })
  @Post("admin-signup")
  adminSignup(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signupAdmin(createAdminDto);
  }

  @ApiOperation({ summary: "Admin signin" })
  @ApiResponse({ status: 200, description: "Admin signed in" })
  @HttpCode(200)
  @Post("admin-signin")
  adminSignin(
    @Body() signInAdminDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signinAdmin(signInAdminDto, res);
  }

  @ApiOperation({ summary: "Admin signout" })
  @ApiResponse({ status: 200, description: "Admin signed out" })
  @Post("admin-signout")
  adminSignout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.signoutAdmin(req, res);
  }

  @ApiOperation({ summary: "Admin refresh token" })
  @ApiResponse({ status: 200, description: "Admin token refreshed" })
  @Post("admin-refresh")
  adminRefresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshAdminToken(req, res);
  }

  @ApiOperation({ summary: "Admin activate" })
  @ApiResponse({ status: 200, description: "Admin activated" })
  @Post("admin-activate")
  adminActivate(@Body("activation_link") activation_link: string) {
    return this.authService.activateAdmin(activation_link);
  }

  @ApiOperation({ summary: "User signout" })
  @ApiResponse({ status: 200, description: "User signed out" })
  @Post("signout")
  signout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.signout(req, res);
  }

  @ApiOperation({ summary: "User refresh token" })
  @ApiResponse({ status: 200, description: "User token refreshed" })
  @Post("refresh/:userId")
  refresh(
    @Param("userId", ParseIntPipe) userId: number,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshUserToken(userId, req, res);
  }

  @ApiOperation({ summary: "User activate" })
  @ApiResponse({ status: 200, description: "User activated" })
  @Post("activate")
  activate(@Body("activation_link") activation_link: string) {
    return this.authService.activateUser(activation_link);
  }
}
