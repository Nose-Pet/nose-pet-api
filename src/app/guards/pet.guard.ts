import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { PetService } from '../../pet/pet.service';
import { IRequestAugmented } from '../app.interface';
import { ClientRequestException } from '../exceptions/request.exception';
import ERROR_CODE from '../exceptions/error-code';

@Injectable()
export class PetGuard implements CanActivate {
  constructor(private readonly petService: PetService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<IRequestAugmented>();

    const userPetGroup = req.extras.getUserPetGroup();
    const petIdx = req.params.petIdx;

    const pet = await this.petService.getPetDetail(userPetGroup, Number(petIdx));
    if (!pet) {
      throw new ClientRequestException(ERROR_CODE.ERR_003_0003, HttpStatus.BAD_REQUEST);
    }

    req.extras.setPet(pet);

    return true;
  }
}
