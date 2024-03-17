import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserSignupDto } from './user.dto';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';
import { EntityManager } from 'typeorm';
import { UserSecretService } from '../user-secret/user-secret.service';
import { User } from 'nose-pet-entity/dist/user/user.entity';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';

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

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.getUser({ email }, ['userSecret']);
  }
}
