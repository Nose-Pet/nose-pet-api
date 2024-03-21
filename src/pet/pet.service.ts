import { Injectable } from '@nestjs/common';
import { PetRepository } from './pet.repository';
import { CreatePetBodyDto } from './pet.dto';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';
import { User } from 'nose-pet-entity/dist/user/user.entity';
import { EntityManager } from 'typeorm';
import { Pet } from 'nose-pet-entity/dist/pet/pet.entity';

@Injectable()
export class PetService {
  constructor(private readonly petRepository: PetRepository) {}

  async addPet(userPetGroup: UserPetGroup, user: User, dto: CreatePetBodyDto, manager?: EntityManager) {
    return this.petRepository.add(
      this.petRepository.createInstance({
        name: dto.name,
        gender: dto.gender,
        isNeutered: dto.isNeutered,
        birth: dto.birth,
        petType: dto.type,
        image: dto?.image,
        creator: user,
        userPetGroup: userPetGroup,
      }),
      manager,
    );
  }

  async getPetDetail(userPetGroup: UserPetGroup, petIdx: number): Promise<Pet | undefined> {
    return this.petRepository.getPetDetail(userPetGroup, petIdx);
  }
}
