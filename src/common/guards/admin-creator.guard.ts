import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AdminCreatorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // logics ->
    const req = context.switchToHttp().getRequest();
    console.log(req.users);
    if (!req.admin.is_creator) {
      throw new ForbiddenException({ message: "You are not a creator" });
    }
    return true;
  }
}
