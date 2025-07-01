import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
async function start() {
  try {
    const PORT = process.env.PORT ?? 3030;
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
      .setTitle("Inbook Project")
      .setDescription("This project involves NestsJS RESTFULL API")
      .setVersion("1.0")
      .addTag("AccessToken, RefreshToken, Cookie, BOT, SMM, SendMail, Guards")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");
    await app.listen(PORT, () => {
      console.log(`Server started at 🐷: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

start();
