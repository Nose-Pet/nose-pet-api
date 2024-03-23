import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'nose-pet-entity/dist/pet/pet.entity';
import { DeepPartial, EntityManager, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';
import { PetStatus } from 'nose-pet-entity/dist/pet/pet.constant';
import { ListFilterQueryDto } from '../app/dto/common.dto';

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

  async update(where: FindOptionsWhere<Pet>, set: DeepPartial<Pet>, manager?: EntityManager): Promise<UpdateResult> {
    if (manager) {
      return manager.update(Pet, where, set);
    }
    return this.repository.update(where, set);
  }

  async getPetDetail(userPetGroup: UserPetGroup, petIdx: number): Promise<Pet | undefined> {
    const queryBuilder = this.repository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.petType', 'petType')
      .leftJoinAndSelect('pet.petNosePrint', 'petNosePrint')
      .leftJoinAndSelect('pet.userPetGroup', 'userPetGroup')
      .leftJoinAndSelect('pet.creator', 'creator')
      .where('pet.idx = :petIdx', { petIdx })
      .andWhere('userPetGroup.idx = :userPetGroupIdx', { userPetGroupIdx: userPetGroup.idx })
      .andWhere('pet.status != :status', { status: PetStatus.Deleted });

    const result = await queryBuilder.getOne();
    if (result) {
      return result;
    }
    return undefined;
  }

  async getPetListByUserPetGroup(userPetGroup: UserPetGroup, query: ListFilterQueryDto = {}): Promise<[Pet[], number]> {
    const queryBuilder = this.repository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.petType', 'petType')
      .leftJoinAndSelect('pet.petNosePrint', 'petNosePrint')
      .leftJoinAndSelect('pet.userPetGroup', 'userPetGroup')
      .where('userPetGroup.idx = :userPetGroupIdx', { userPetGroupIdx: userPetGroup.idx })
      .andWhere('pet.status != :status', { status: PetStatus.Deleted })
      .orderBy('pet.createdDate', 'ASC');

    if (query?.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query?.offset) {
      queryBuilder.offset(query.offset);
    }

    if (query?.searchTerm) {
      queryBuilder.andWhere('pet.name LIKE :searchTerm', { searchTerm: `%${query.searchTerm}%` });
    }

    return queryBuilder.getManyAndCount();
  }
}
