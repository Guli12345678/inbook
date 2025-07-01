import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AdminCreatorGuard } from "../common/guards/admin-creator.guard";
import { JwtAdminAuthGuard } from "../common/guards/admin-auth.guard";
import { AdminSelfGuard } from "../common/guards/admin-self.guard";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Admins")
@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: "Create admin" })
  @ApiResponse({ status: 201, description: "Admin created" })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({ status: 200, description: "List of admins" })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(JwtAdminAuthGuard)
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @ApiOperation({ summary: "Get admin by id" })
  @ApiResponse({ status: 200, description: "Admin found" })
  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtAdminAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update admin" })
  @ApiResponse({ status: 200, description: "Admin updated" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Delete admin" })
  @ApiResponse({ status: 200, description: "Admin deleted" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminsService.remove(+id);
  }
}
