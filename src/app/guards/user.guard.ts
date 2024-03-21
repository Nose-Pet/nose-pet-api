import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { IRequestAugmented } from '../app.interface';
import { ClientRequestException } from '../exceptions/request.exception';
import ERROR_CODE from '../exceptions/error-code';
import { UserStatus } from 'nose-pet-entity/dist/user/user.constant';
import { UserService } from '../../user/user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<IRequestAugmented>();

    const payload = req.extras.getPayload();

    const user = await this.userService.getUserFullJoinedByIdx(payload.userIdx);
    if (!user) {
      throw new ClientRequestException(ERROR_CODE.ERR_002_0001, HttpStatus.UNAUTHORIZED);
    }
    if (user.status !== UserStatus.Activated) {
      throw new ClientRequestException(ERROR_CODE.ERR_002_0010, HttpStatus.UNAUTHORIZED);
    }
    if (!user.userPetGroup) {
      throw new ClientRequestException(ERROR_CODE.ERR_002_0011, HttpStatus.UNAUTHORIZED);
    }

    req.extras.setPayload(payload);
    req.extras.setUser(user);
    req.extras.setUserPetGroup(user.userPetGroup);

    return true;
  }
}
