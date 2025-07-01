import { PartialType } from "@nestjs/swagger";
import { CreateLanguageDto } from "./create-language.dto";

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {
  code?: string;
  name?: string;
  flag?: string;
}
