import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSecret } from 'nose-pet-entity/dist/user-secret/user-secret.entity';
import { DeepPartial, EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserSecretRepository {
  constructor(@InjectRepository(UserSecret) private readonly repository: Repository<UserSecret>) {}

  createInstance(obj: DeepPartial<UserSecret>): UserSecret {
    return this.repository.create(obj);
  }

  async add(userSecret: UserSecret, manager?: EntityManager) {
    if (manager) {
      return manager.save(UserSecret, userSecret);
    }
    return this.repository.save(userSecret);
  }
}
