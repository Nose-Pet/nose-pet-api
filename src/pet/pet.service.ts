import { HttpStatus, Injectable } from '@nestjs/common';
import { PetRepository } from './pet.repository';
import { CreatePetBodyDto, ModifyPetBodyDto } from './pet.dto';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';
import { User } from 'nose-pet-entity/dist/user/user.entity';
import { EntityManager, Not } from 'typeorm';
import { Pet } from 'nose-pet-entity/dist/pet/pet.entity';
import { PetStatus } from 'nose-pet-entity/dist/pet/pet.constant';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';

@Injectable()
export class PetService {
  constructor(private readonly petRepository: PetRepository) {}

  async addPet(userPetGroup: UserPetGroup, user: User, dto: CreatePetBodyDto, manager?: EntityManager) {
    if (await this.isDuplicatedPet(userPetGroup, dto.name)) {
      throw new ClientRequestException(ERROR_CODE.ERR_003_0004, HttpStatus.BAD_REQUEST);
    }

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

  async isDuplicatedPet(userPetGroup: UserPetGroup, name: string): Promise<boolean> {
    const pet = await this.petRepository.getPet({
      name: name,
      userPetGroup: { idx: userPetGroup.idx },
      status: Not(PetStatus.Deleted),
    });
    return !!pet;
  }

  async updatePetStatus(pet: Pet, status: PetStatus, manager?: EntityManager) {
    return this.petRepository.update({ idx: pet.idx }, { status }, manager);
  }

  async modifyPet(pet: Pet, dto: ModifyPetBodyDto, manager?: EntityManager) {
    return this.petRepository.update(
      { idx: pet.idx },
      {
        name: dto.name,
        gender: dto.gender,
        isNeutered: dto.isNeutered,
        birth: dto.birth,
        petType: dto.type,
        image: dto?.image,
      },
      manager,
    );
  }
}
