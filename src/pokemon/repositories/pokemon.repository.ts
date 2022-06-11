import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { CustomRepository } from 'src/shared/decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Pokemon } from '../entities/pokemon.entity';

@CustomRepository(Pokemon)
export class PokemonRepository extends Repository<Pokemon> {
  async getByDex(input: number): Promise<Pokemon> {
    const p = await this.findOne({ where: { natDex: input } });
    return p;
  }

  async getByName(input: string): Promise<Pokemon> {
    const p = await this.findOne({ where: { name: input } });
    return p;
  }
}
