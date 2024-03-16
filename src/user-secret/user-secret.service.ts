import { Injectable } from '@nestjs/common';
import { UserSecretRepository } from './user-secret.repository';
import { User } from 'nose-pet-entity/dist/user/user.entity';
import crypto from 'crypto';
import { encryptPassword } from '../app/app.util';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserSecretService {
  constructor(private readonly userSecretRepository: UserSecretRepository) {}

  async addUserSecret(user: User, password: string, manager?: EntityManager) {
    const { salt, hash } = encryptPassword(password);

    return this.userSecretRepository.add(
      this.userSecretRepository.createInstance({
        user,
        encryptedPassword: hash,
        salt,
      }),
      manager,
    );
  }
}
