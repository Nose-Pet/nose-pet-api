import { Exclude, Expose } from 'class-transformer';
import { PetNosePrint } from 'nose-pet-entity/dist/pet-nose-print/pet-nose-print.entity';

export class PetNosePrintResponseDto {
  @Exclude() private readonly _idx: number;

  constructor(petNosePrint: PetNosePrint) {
    this._idx = petNosePrint.idx;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }
}
