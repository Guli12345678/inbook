import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtUserAuthGuard } from "../common/guards/user.guard";
import { SelfGuard } from "../common/guards/user-self.guard";
import { JwtPremiumGuard } from "../common/guards/jwt-premium.guard";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 201, description: "User created" })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "List of users" })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Get user by id" })
  @ApiResponse({ status: 200, description: "User found" })
  @UseGuards(SelfGuard)
  @UseGuards(JwtPremiumGuard)
  @UseGuards(JwtUserAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: "Update user" })
  @ApiResponse({ status: 200, description: "User updated" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: 200, description: "User deleted" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
  @ApiOperation({ summary: "Send OTP to user" })
  @ApiResponse({ status: 200, description: "User deleted" })
  @HttpCode(200)
  @Post("/new-otp")
  newOtp(@Body() phoneUserDto: PhoneUserDto) {
    return this.usersService.newOtp(phoneUserDto);
  }
  @ApiOperation({ summary: "Verify OTP to user" })
  @ApiResponse({ status: 200, description: "User deleted" })
  @HttpCode(200)
  @Post("/verify-otp")
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.usersService.verifyOtp(verifyOtpDto);
  }
}
