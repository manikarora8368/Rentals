import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { jwtr } from './auth.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext) {
    let token = context.switchToHttp().getRequest().headers.authorization;
    if (token) {
      token = token.split(' ')[1];
    }
    // await jwtr.destroy('9');
    try {
      await jwtr.verify(token, jwtConstants.secret);
      return true;
    } catch (err) {
      throw new HttpException(
        'Please enter a valid JWT token',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
