import { HttpStatus, Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './auth.dto';
import { UserPetGroupService } from '../user-pet-group/user-pet-group.service';
import { UserService } from '../user/user.service';
import { DataSource } from 'typeorm';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';
import { UserSecretService } from '../user-secret/user-secret.service';
import { TokenService } from '../token/token.service';
import { TokenStatus, TokenType } from 'nose-pet-entity/dist/token/token.constant';
import { Token } from 'nose-pet-entity/dist/token/token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userPetGroupService: UserPetGroupService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly dataSource: DataSource,
  ) {}

  async signup(body: SignupDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const duplicateUser = await this.userService.getUserByEmail(body.email);
      if (duplicateUser) {
        throw new ClientRequestException(ERROR_CODE.ERR_002_0009, HttpStatus.BAD_REQUEST);
      }

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

  async signin(body: SigninDto): Promise<Token> {
    const queryRunner = this.dataSource.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.userService.getUserByEmail(body.email);
      if (!user) {
        throw new ClientRequestException(ERROR_CODE.ERR_002_0001, HttpStatus.BAD_REQUEST);
      }

      const { encryptedPassword, salt } = user.userSecret;
      if (!UserSecretService.comparePassword(body.password, salt, encryptedPassword)) {
        throw new ClientRequestException(ERROR_CODE.ERR_002_0001, HttpStatus.BAD_REQUEST);
      }

      const activatedToken = await this.tokenService.getActivatedToken(user, TokenType.Login);
      if (activatedToken) {
        await this.tokenService.updateTokenStatus(activatedToken, TokenStatus.DeactivatedByOtherSession, manager);
      }

      // TODO: 토큰 만료 시간을 30일로 설정
      const usagePeriod = 1 * 60 * 60 * 24 * 30;
      const token = await this.tokenService.createToken(user, {}, TokenType.Login, usagePeriod, manager);

      await queryRunner.commitTransaction();
      return token;
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
