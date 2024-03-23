import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'nose-pet-entity/dist/pet/pet.entity';
import { PetRepository } from './pet.repository';
import { UserModule } from '../user/user.module';
import { PetTypeModule } from '../pet-type/pet-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), UserModule, PetTypeModule],
  providers: [PetService, PetRepository],
  controllers: [PetController],
  exports: [TypeOrmModule, PetService],
})
export class PetModule {}
