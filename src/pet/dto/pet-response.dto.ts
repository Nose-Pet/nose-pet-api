import { Exclude, Expose } from 'class-transformer';
import { PetGender, PetStatus } from 'nose-pet-entity/dist/pet/pet.constant';
import { PetType } from 'nose-pet-entity/dist/pet-type/pet-type.entity';
import { PetNosePrint } from 'nose-pet-entity/dist/pet-nose-print/pet-nose-print.entity';
import { Pet } from 'nose-pet-entity/dist/pet/pet.entity';
import { PetNosePrintResponseDto } from '../../pet-nose-print/dto/pet-nose-print-response.dto';

export class PetResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _gender: PetGender;
  @Exclude() private readonly _isNeutered: boolean;
  @Exclude() private readonly _birth: Date;
  @Exclude() private readonly _image: string;
  @Exclude() private readonly _status: PetStatus;
  @Exclude() private readonly _createdDate: Date;
  @Exclude() private readonly _modifiedDate: Date;
  @Exclude() private readonly _petType: PetType;
  @Exclude() private readonly _petNosePrint?: PetNosePrint;

  constructor(pet: Pet) {
    this._idx = pet.idx;
    this._name = pet.name;
    this._gender = pet.gender;
    this._isNeutered = pet.isNeutered;
    this._birth = pet.birth;
    this._image = pet.image;
    this._status = pet.status;
    this._createdDate = pet.createdDate;
    this._modifiedDate = pet.modifiedDate;
    this._petType = pet.petType;
    this._petNosePrint = pet.petNosePrint;
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
  get gender(): PetGender {
    return this._gender;
  }

  @Expose()
  get isNeutered(): boolean {
    return this._isNeutered;
  }

  @Expose()
  get birth(): Date {
    return this._birth;
  }

  @Expose()
  get image(): string {
    return this._image;
  }

  @Expose()
  get status(): PetStatus {
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

  @Expose()
  get petType(): PetType {
    return this._petType;
  }

  @Expose()
  get petNosePrint(): PetNosePrintResponseDto | null {
    if (!this._petNosePrint) {
      return null;
    }
    return new PetNosePrintResponseDto(this._petNosePrint);
  }
}
