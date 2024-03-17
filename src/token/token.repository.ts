import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { Token } from 'nose-pet-entity/dist/token/token.entity';

@Injectable()
export class TokenRepository {
  constructor(@InjectRepository(Token) private repository: Repository<Token>) {}

  createInstance(obj: DeepPartial<Token>): Token {
    return this.repository.create(obj);
  }

  async getToken(where: FindOptionsWhere<Token>, relations?: string[]): Promise<Token | undefined> {
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

  async add(token: Token, manager?: EntityManager): Promise<Token> {
    if (manager) {
      return manager.save(Token, token);
    }
    return this.repository.save(token);
  }

  async update(where: FindOptionsWhere<Token>, set: DeepPartial<Token>, manager?: EntityManager): Promise<UpdateResult> {
    if (manager) {
      return manager.update(Token, where, set);
    }
    return this.repository.update(where, set);
  }
}
