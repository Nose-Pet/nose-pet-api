import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'nose-pet-entity/dist/pet/pet.entity';
import { DeepPartial, EntityManager, Repository } from 'typeorm';

@Injectable()
export class PetRepository {
  constructor(@InjectRepository(Pet) private readonly repository: Repository<Pet>) {}

  createInstance(obj: DeepPartial<Pet>): Pet {
    return this.repository.create(obj);
  }

  async add(pet: Pet, manager?: EntityManager): Promise<Pet> {
    if (manager) {
      return manager.save(Pet, pet);
    }
    return this.repository.save(pet);
  }
}
