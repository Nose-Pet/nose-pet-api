import { Module } from '@nestjs/common';
import { UserSecretService } from './user-secret.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSecret } from 'nose-pet-entity/dist/user-secret/user-secret.entity';
import { UserSecretRepository } from './user-secret.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserSecret])],
  providers: [UserSecretService, UserSecretRepository],
  exports: [TypeOrmModule, UserSecretService],
})
export class UserSecretModule {}
