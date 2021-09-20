import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string>('role', context.getHandler());
    const { user, params } = context.switchToHttp().getRequest();
    //  || user.id===params.id
    if (role.includes(user.role)) {
      return true;
    }
    throw new HttpException(
      "You don't have the permissions to perform the task",
      HttpStatus.FORBIDDEN,
    );
  }
}
