import { Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { TokenStatus, TokenType } from 'nose-pet-entity/dist/token/token.constant';
import { Token } from 'nose-pet-entity/dist/token/token.entity';
import { User } from 'nose-pet-entity/dist/user/user.entity';
import { jwtSign } from './token.util';
import { add, format } from 'date-fns';
import { EntityManager, UpdateResult } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async createToken(user: User, data: any, type: TokenType, usagePeriod: number, manager?: EntityManager): Promise<Token> {
    const payload = {
      userIdx: user.idx,
      ...data,
    };
    const jwtToken = jwtSign(payload, '99y'); // fix 99 years

    const token = this.tokenRepository.createInstance({
      user,
      type,
      content: jwtToken,
      expiredDate: format(add(new Date(), { seconds: usagePeriod }), 'yyyy-MM-dd'),
    });

    return this.tokenRepository.add(token, manager);
  }

  async getActivatedToken(user: User, type: TokenType): Promise<Token | undefined> {
    return this.tokenRepository.getToken({ user: { idx: user.idx }, type, status: TokenStatus.Activated });
  }

  async updateTokenStatus(token: Token, status: TokenStatus, manager?: EntityManager): Promise<UpdateResult> {
    return this.tokenRepository.update({ idx: token.idx }, { status }, manager);
  }
}
