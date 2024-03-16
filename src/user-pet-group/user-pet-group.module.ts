import { Module } from '@nestjs/common';
import { UserPetGroupService } from './user-pet-group.service';
import { UserPetGroupRepository } from './user-pet-group.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPetGroup])],
  providers: [UserPetGroupService, UserPetGroupRepository],
  exports: [TypeOrmModule, UserPetGroupService],
})
export class UserPetGroupModule {}
