import { Exclude, Expose } from 'class-transformer';
import { Token } from 'nose-pet-entity/dist/token/token.entity';

export class AuthSigninResponseDto {
  @Exclude() private readonly _token: Token;

  constructor(token: Token) {
    this._token = token;
  }

  @Expose()
  get accessToken(): string {
    return this._token.content;
  }

  @Expose()
  get expiredDate(): Date {
    return this._token.expiredDate;
  }
}
