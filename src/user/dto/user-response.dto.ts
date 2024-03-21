import { Exclude, Expose } from 'class-transformer';
import { UserStatus } from 'nose-pet-entity/dist/user/user.constant';
import { User } from 'nose-pet-entity/dist/user/user.entity';

export class UserResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _email: string;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _nickname: string;
  @Exclude() private readonly _status: UserStatus;
  @Exclude() private readonly _createdDate: Date;
  @Exclude() private readonly _modifiedDate: Date;

  constructor(user: User) {
    this._idx = user.idx;
    this._email = user.email;
    this._name = user.name;
    this._nickname = user.nickname;
    this._status = user.status;
    this._createdDate = user.createdDate;
    this._modifiedDate = user.modifiedDate;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get email(): string {
    return this._email;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get nickname(): string {
    return this._nickname;
  }

  @Expose()
  get status(): UserStatus {
    return this._status;
  }

  @Expose()
  get createdDate(): Date {
    return this._createdDate;
  }

  @Expose()
  get modifiedDate(): Date {
    return this._modifiedDate;
  }
}
