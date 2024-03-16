import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserSignupDto } from './user.dto';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';
import { EntityManager } from 'typeorm';
import { UserSecretService } from '../user-secret/user-secret.service';
import { User } from 'nose-pet-entity/dist/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userSecretService: UserSecretService,
  ) {}

  async addUser(dto: UserSignupDto, userPetGroup: UserPetGroup, manager?: EntityManager): Promise<User> {
    const user = await this.userRepository.add(
      this.userRepository.createInstance({
        email: dto.email,
        name: dto.name,
        nickname: dto.nickname,
        userPetGroup,
      }),
      manager,
    );

    await this.userSecretService.addUserSecret(user, dto.password, manager);

    return user;
  }
}
