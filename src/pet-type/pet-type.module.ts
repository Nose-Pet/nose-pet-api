import { Module } from '@nestjs/common';
import { PetTypeService } from './pet-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetType } from 'nose-pet-entity/dist/pet-type/pet-type.entity';
import { PetTypeRepository } from './pet-type.repository';
import { PetTypeController } from './pet-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PetType])],
  providers: [PetTypeService, PetTypeRepository],
  exports: [TypeOrmModule, PetTypeService],
  controllers: [PetTypeController],
})
export class PetTypeModule {}
