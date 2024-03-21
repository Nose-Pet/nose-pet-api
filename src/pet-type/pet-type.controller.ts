import { Controller, Get } from '@nestjs/common';
import { ApiPath } from './pet-type.constant';
import { PetTypeService } from './pet-type.service';

@Controller(ApiPath.Root)
export class PetTypeController {
  constructor(private readonly petTypeService: PetTypeService) {}

  @Get()
  async getPetTypes() {
    return this.petTypeService.getPetTypes();
  }
}
