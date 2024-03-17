import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiPath } from './auth.constant';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './auth.dto';
import { SignupBodyPipe } from './auth.pipe';
import { AuthSigninResponseDto } from './dto/auth-signin-response.dto';

@Controller(ApiPath.Root)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(ApiPath.Signup)
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body(SignupBodyPipe) body: SignupDto): Promise<void> {
    await this.authService.signup(body);
  }

  @Post(ApiPath.Signin)
  @HttpCode(HttpStatus.CREATED)
  async signin(@Body() body: SigninDto): Promise<AuthSigninResponseDto> {
    const result = await this.authService.signin(body);
    return new AuthSigninResponseDto(result);
  }
}
