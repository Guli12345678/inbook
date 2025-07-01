import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // logics ->
    const req = context.switchToHttp().getRequest();
    console.log(req.users);
    if (req.users.id != req.params.id) {
      throw new ForbiddenException({ message: "Unauthorized user" });
    }
    return true;
  }
}
