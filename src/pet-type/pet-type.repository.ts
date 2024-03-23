import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetType } from 'nose-pet-entity/dist/pet-type/pet-type.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class PetTypeRepository {
  constructor(@InjectRepository(PetType) private readonly repository: Repository<PetType>) {}

  async getPetType(where: FindOptionsWhere<PetType>, relations?: string[]): Promise<PetType | undefined> {
    const options: any = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    const result = await this.repository.findOne(options);
    if (result) {
      return result;
    }
    return undefined;
  }

  async getPetTypes(): Promise<PetType[]> {
    const queryBuilder = this.repository.createQueryBuilder('petType').orderBy('petType.idx', 'ASC');

    return queryBuilder.getMany();
  }
}
