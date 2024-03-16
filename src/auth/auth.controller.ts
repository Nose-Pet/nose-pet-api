import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiPath } from './auth.constant';
import { AuthService } from './auth.service';
import { SignupDto } from './auth.dto';
import { SignupBodyPipe } from './auth.pipe';

@Controller(ApiPath.Root)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(ApiPath.Signup)
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body(SignupBodyPipe) body: SignupDto) {
    return this.authService.signup(body);
  }
}
