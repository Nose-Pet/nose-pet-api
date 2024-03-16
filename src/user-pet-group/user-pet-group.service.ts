import { Injectable } from '@nestjs/common';
import { UserPetGroupRepository } from './user-pet-group.repository';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserPetGroupService {
  constructor(private readonly userPetGroupRepository: UserPetGroupRepository) {}

  async createUserPetGroup(name: string, manager?: EntityManager): Promise<UserPetGroup> {
    return this.userPetGroupRepository.add(this.userPetGroupRepository.createInstance({ name }), manager);
  }
}
