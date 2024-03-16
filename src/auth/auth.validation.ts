import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';
import { HttpStatus } from '@nestjs/common';

@ValidatorConstraint({ name: 'isEmail' })
export class IsEmail implements ValidatorConstraintInterface {
  validate(value: any, validationArguments: ValidationArguments) {
    const property = validationArguments.property;
    if (!value) {
      throw new ClientRequestException(ERROR_CODE.ERR_000_0007, HttpStatus.BAD_REQUEST, { value: property });
    }

    const EMAIL_RULE = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (EMAIL_RULE.test(value)) {
      return true;
    }
    throw new ClientRequestException(ERROR_CODE.ERR_001_0003, HttpStatus.BAD_REQUEST);
  }
}

@ValidatorConstraint({ name: 'isPassword' })
export class IsPassword implements ValidatorConstraintInterface {
  validate(value: any, validationArguments: ValidationArguments) {
    const property = validationArguments.property;
    if (!value) {
      throw new ClientRequestException(ERROR_CODE.ERR_000_0007, HttpStatus.BAD_REQUEST, { value: property });
    }

    const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    if (PASSWORD_RULE.test(value)) {
      return true;
    }
    throw new ClientRequestException(ERROR_CODE.ERR_001_0004, HttpStatus.BAD_REQUEST);
  }
}
