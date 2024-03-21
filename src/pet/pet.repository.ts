import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'nose-pet-entity/dist/pet/pet.entity';
import { DeepPartial, EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';

@Injectable()
export class PetRepository {
  constructor(@InjectRepository(Pet) private readonly repository: Repository<Pet>) {}

  createInstance(obj: DeepPartial<Pet>): Pet {
    return this.repository.create(obj);
  }

  async getPet(where: FindOptionsWhere<Pet>, relations?: string[]): Promise<Pet | undefined> {
    const options: any = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    const result = await this.repository.findOne(options);
    if (result) {
      return result;
    }
    return undefined;
  }

  async add(pet: Pet, manager?: EntityManager): Promise<Pet> {
    if (manager) {
      return manager.save(Pet, pet);
    }
    return this.repository.save(pet);
  }

  async getPetDetail(userPetGroup: UserPetGroup, petIdx: number): Promise<Pet | undefined> {
    const queryBuilder = this.repository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.petType', 'petType')
      .leftJoinAndSelect('pet.petNosePrint', 'petNosePrint')
      .leftJoinAndSelect('pet.userPetGroup', 'userPetGroup')
      .leftJoinAndSelect('pet.creator', 'creator')
      .where('pet.idx = :petIdx', { petIdx })
      .andWhere('userPetGroup.idx = :userPetGroupIdx', { userPetGroupIdx: userPetGroup.idx });

    const result = await queryBuilder.getOne();
    if (result) {
      return result;
    }
    return undefined;
  }
}
