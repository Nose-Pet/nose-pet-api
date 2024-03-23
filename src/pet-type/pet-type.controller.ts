import { Controller, Get } from '@nestjs/common';
import { ApiPath } from './pet-type.constant';
import { PetTypeService } from './pet-type.service';
import { IListResponse } from '../app/interfaces/common.interface';
import { PetTypeListResponseDto } from './dto/pet-type-list-response.dto';

@Controller(ApiPath.Root)
export class PetTypeController {
  constructor(private readonly petTypeService: PetTypeService) {}

  @Get()
  async getPetTypes(): Promise<IListResponse<PetTypeListResponseDto>> {
    const result = await this.petTypeService.getPetTypes();
    return { list: result.map((petType) => new PetTypeListResponseDto(petType)) };
  }
}
