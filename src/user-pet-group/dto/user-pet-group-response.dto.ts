import { Exclude, Expose } from 'class-transformer';
import { UserPetGroupStatus } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.constant';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';

export class UserPetGroupResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _status: UserPetGroupStatus;
  @Exclude() private readonly _createdDate: Date;
  @Exclude() private readonly _modifiedDate: Date;

  constructor(userPetGroup: UserPetGroup) {
    this._idx = userPetGroup.idx;
    this._name = userPetGroup.name;
    this._status = userPetGroup.status;
    this._createdDate = userPetGroup.createdDate;
    this._modifiedDate = userPetGroup.modifiedDate;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get status(): UserPetGroupStatus {
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
