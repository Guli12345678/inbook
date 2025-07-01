import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { verify } from "crypto";
import { Observable } from "rxjs";

@Injectable()
export class JwtAdminAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: "AuthHeader not found 👾❌" });
    }
    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];
    if (bearer != "Bearer" || !token) {
      throw new UnauthorizedException({
        message: "BearerToken not found 👾❌",
      });
    }

    //logika
    let decodedPayload: object;
    try {
      decodedPayload = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEYAdmin,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        message: "foydalanuvchi autorizatsiyadan o'tmagan",
        error: error,
      });
    }
    req.admin = decodedPayload;
    return true;
  }
}
