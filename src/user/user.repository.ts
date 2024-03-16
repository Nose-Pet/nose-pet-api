import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'nose-pet-entity/dist/user/user.entity';
import { DeepPartial, EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  createInstance(obj: DeepPartial<User>): User {
    return this.repository.create(obj);
  }

  async add(userPetGroup: User, manager?: EntityManager): Promise<User> {
    if (manager) {
      return manager.save(User, userPetGroup);
    }
    return this.repository.save(userPetGroup);
  }
}
