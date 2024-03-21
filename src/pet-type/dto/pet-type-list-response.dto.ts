import { Exclude, Expose } from 'class-transformer';
import { PetType } from 'nose-pet-entity/dist/pet-type/pet-type.entity';

export class PetTypeListResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;

  constructor(petType: PetType) {
    this._idx = petType.idx;
    this._name = petType.name;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get name(): string {
    return this._name;
  }
}
