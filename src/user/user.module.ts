import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'nose-pet-entity/dist/user/user.entity';
import { UserRepository } from './user.repository';
import { UserSecretModule } from '../user-secret/user-secret.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserSecretModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
