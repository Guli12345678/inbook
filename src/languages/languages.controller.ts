import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LanguagesService } from "./languages.service";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Languages")
@Controller("languages")
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @ApiOperation({ summary: "Create language" })
  @ApiResponse({ status: 201, description: "Language created" })
  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @ApiOperation({ summary: "Get all languages" })
  @ApiResponse({ status: 200, description: "List of languages" })
  @Get()
  findAll() {
    return this.languagesService.findAll();
  }

  @ApiOperation({ summary: "Get language by id" })
  @ApiResponse({ status: 200, description: "Language found" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.languagesService.findOne(+id);
  }

  @ApiOperation({ summary: "Update language" })
  @ApiResponse({ status: 200, description: "Language updated" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateLanguageDto: UpdateLanguageDto
  ) {
    return this.languagesService.update(+id, updateLanguageDto);
  }

  @ApiOperation({ summary: "Delete language" })
  @ApiResponse({ status: 200, description: "Language deleted" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.languagesService.remove(+id);
  }
}
