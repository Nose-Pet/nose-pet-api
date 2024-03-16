import { Injectable } from '@nestjs/common';
import { SignupDto } from './auth.dto';
import { UserPetGroupService } from '../user-pet-group/user-pet-group.service';
import { UserService } from '../user/user.service';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userPetGroupService: UserPetGroupService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async signup(body: SignupDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // TODO: 그룹은 유저의 닉네임으로 임시 생성
      const userPetGroup = await this.userPetGroupService.createUserPetGroup(body.nickname, manager);
      await this.userService.addUser(body, userPetGroup, manager);

      await queryRunner.commitTransaction();
    } catch (e) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
