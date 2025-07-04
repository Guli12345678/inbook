import { Context, Markup } from "telegraf";
import { LibraryService } from "./library.service";
import { Ctx, Hears, Update } from "nestjs-telegraf";

@Update()
export class LibraryUpdate {
  constructor(private readonly libraryService: LibraryService) {}

  @Hears("📚 Kutubxona")
  async onHearsLibrary(@Ctx() ctx: Context) {
    await this.libraryService.onLibrary(ctx);
  }
  @Hears("Yangi kutubxona qo'shish")
  async onHearsAddLibrary(@Ctx() ctx: Context) {
    await this.libraryService.addNewLibrary(ctx);
  }
}
