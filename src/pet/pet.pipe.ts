import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { PetTypeService } from '../pet-type/pet-type.service';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';

@Injectable()
export class CreatePetBodyPipe implements PipeTransform {
  constructor(private readonly petTypeService: PetTypeService) {}

  async transform(value: any) {
    const petType = await this.petTypeService.getPetTypeByName(value.type);
    if (!petType) {
      throw new ClientRequestException(ERROR_CODE.ERR_003_0002, HttpStatus.BAD_REQUEST);
    }
    value.type = petType;

    return value;
  }
}

@Injectable()
export class ModifyPetBodyPipe extends CreatePetBodyPipe {}
