import { Controller } from '@nestjs/common';
import { ApiPath } from './user.constant';

@Controller(ApiPath.Root)
export class UserController {}
