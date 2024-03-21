import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PetGender } from 'nose-pet-entity/dist/pet/pet.constant';

@ValidatorConstraint({ name: 'isPetGender' })
@Injectable()
export class IsPetGender implements ValidatorConstraintInterface {
  validate(value: any, validationArguments: ValidationArguments): boolean {
    const property = validationArguments.property;
    if (Object.values(PetGender).includes(value)) {
      return true;
    }

    throw new ClientRequestException(ERROR_CODE.ERR_003_0001, HttpStatus.BAD_REQUEST, { value: property });
  }
}
