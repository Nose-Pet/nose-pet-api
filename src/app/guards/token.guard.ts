import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { IRequestAugmented } from '../app.interface';
import { ClientRequestException } from '../exceptions/request.exception';
import ERROR_CODE from '../exceptions/error-code';
import { jwtVerify } from '../../token/token.util';

@Injectable()
export class TokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<IRequestAugmented>();
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new ClientRequestException(ERROR_CODE.ERR_002_0004, HttpStatus.BAD_REQUEST);
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new ClientRequestException(ERROR_CODE.ERR_001_0005, HttpStatus.BAD_REQUEST);
    }

    const token = authorization.replace('Bearer ', '');
    const payload = jwtVerify(token);

    req.extras.setPayload(payload);

    return true;
  }
}
