import { Validate } from 'class-validator';
import { IsEmail, IsPassword } from './auth.validation';
import { IsString } from '../app/validations/common.validation';

export class SignupDto {
  @Validate(IsEmail)
  email: string;

  @Validate(IsPassword)
  password: string;

  @Validate(IsString)
  confirmPassword: string;

  @Validate(IsString)
  name: string;

  @Validate(IsString)
  nickname: string;
}

export class SigninDto {
  @Validate(IsEmail)
  email: string;

  @Validate(IsPassword)
  password: string;
}
