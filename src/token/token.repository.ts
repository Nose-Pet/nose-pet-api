import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from 'nose-pet-entity/dist/token/token.entity';

@Injectable()
export class TokenRepository {
  constructor(@InjectRepository(Token) private repository: Repository<Token>) {}
}
