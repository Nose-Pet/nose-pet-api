import { Injectable } from '@nestjs/common';
import { UserSecretRepository } from './user-secret.repository';
import { User } from 'nose-pet-entity/dist/user/user.entity';
import * as crypto from 'crypto';
import { EntityManager } from 'typeorm';
import { config } from '../app/config/config.service';

@Injectable()
export class UserSecretService {
  constructor(private readonly userSecretRepository: UserSecretRepository) {}

  static encryptPassword(password: string): { salt: string; hash: string } {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, config.passwordKeyStretch, 32, 'sha256').toString('hex');

    return { salt, hash };
  }

  static comparePassword(password: string, salt: string, hash: string): boolean {
    return crypto.pbkdf2Sync(password, salt, config.passwordKeyStretch, 32, 'sha256').toString('hex') === hash;
  }

  async addUserSecret(user: User, password: string, manager?: EntityManager) {
    const { salt, hash } = UserSecretService.encryptPassword(password);

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
