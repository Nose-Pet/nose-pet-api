import { Injectable } from '@nestjs/common';
import { PetTypeRepository } from './pet-type.repository';
import { PetType } from 'nose-pet-entity/dist/pet-type/pet-type.entity';

@Injectable()
export class PetTypeService {
  constructor(private readonly petTypeRepository: PetTypeRepository) {}

  async getPetTypeByName(name: string): Promise<PetType | undefined> {
    return this.petTypeRepository.getPetType({ name });
  }

  async getPetTypes(): Promise<PetType[]> {
    return this.petTypeRepository.getPetTypes();
  }
}
