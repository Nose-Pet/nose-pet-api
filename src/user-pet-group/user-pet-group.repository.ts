import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';
import { DeepPartial, EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserPetGroupRepository {
  constructor(@InjectRepository(UserPetGroup) private readonly repository: Repository<UserPetGroup>) {}

  createInstance(obj: DeepPartial<UserPetGroup>): UserPetGroup {
    return this.repository.create(obj);
  }

  async add(userPetGroup: UserPetGroup, manager?: EntityManager): Promise<UserPetGroup> {
    if (manager) {
      return manager.save(UserPetGroup, userPetGroup);
    }
    return this.repository.save(userPetGroup);
  }
}
