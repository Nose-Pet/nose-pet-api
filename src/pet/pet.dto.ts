import { IsOptional, Validate } from 'class-validator';
import { IsBoolean, IsString } from '../app/validations/common.validation';
import { PetGender } from 'nose-pet-entity/dist/pet/pet.constant';
import { IsPetGender } from './pet.validation';
import { PetType } from 'nose-pet-entity/dist/pet-type/pet-type.entity';

export class CreatePetBodyDto {
  @Validate(IsString)
  name: string;

  @Validate(IsPetGender)
  gender: PetGender;

  @Validate(IsBoolean)
  isNeutered: boolean;

  @Validate(IsString)
  birth: string;

  @Validate(IsString)
  @IsOptional()
  image?: string;

  @Validate(IsString)
  type: PetType;
}

export class GetPetParamDto {
  petIdx: number;
}

export class ModifyPetBodyDto extends CreatePetBodyDto {}
