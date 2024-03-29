import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserPetGroupModule } from '../user-pet-group/user-pet-group.module';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [UserPetGroupModule, UserModule, TokenModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
