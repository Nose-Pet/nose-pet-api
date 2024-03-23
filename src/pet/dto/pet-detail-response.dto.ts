import { Exclude, Expose } from 'class-transformer';
import { Pet } from 'nose-pet-entity/dist/pet/pet.entity';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';
import { User } from 'nose-pet-entity/dist/user/user.entity';
import { PetResponseDto } from './pet-response.dto';
import { UserPetGroupResponseDto } from '../../user-pet-group/dto/user-pet-group-response.dto';
import { UserResponseDto } from '../../user/dto/user-response.dto';

export class PetDetailResponseDto {
  @Exclude() private readonly _pet: Pet;
  @Exclude() private readonly _userPetGroup: UserPetGroup;
  @Exclude() private readonly _creator: User;

  constructor(pet: Pet) {
    this._pet = pet;
    this._userPetGroup = pet.userPetGroup;
    this._creator = pet.creator;
  }

  @Expose()
  get pet(): PetResponseDto {
    return new PetResponseDto(this._pet);
  }

  @Expose()
  get ownedUserPetGroupInfo(): UserPetGroupResponseDto {
    return new UserPetGroupResponseDto(this._userPetGroup);
  }

  @Expose()
  get creatorInfo(): UserResponseDto {
    return new UserResponseDto(this._creator);
  }
}
