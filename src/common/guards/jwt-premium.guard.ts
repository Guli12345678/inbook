import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class JwtPremiumGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // logics ->
    const req = context.switchToHttp().getRequest();
    console.log(req.users);
    if (!req.users.is_premium) {
      throw new ForbiddenException({ message: "You are not a premium user" });
    }
    return true;
  }
}
