import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';

@Injectable()
export class SignupBodyPipe implements PipeTransform {
  transform(value: any): any {
    if (value.password !== value.confirmPassword) {
      throw new ClientRequestException(ERROR_CODE.ERR_002_0008, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
