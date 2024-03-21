import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { RequestExtras } from '../interceptors/request-extras';
import { IRequestAugmented } from '../app.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IRequestAugmented, res: Response, next: () => void): Promise<any> {
    req.extras = new RequestExtras();
    next();
  }
}
