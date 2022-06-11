import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { plainToInstance } from 'class-transformer';
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto';
import {
  DataAndPagination,
  PaginationResponseDto,
} from 'src/shared/dtos/pagination-response.dto';
import { PokemonMiniDTO } from './dtos/pokemon-mini.dto';
import { PokemonRepository } from './repositories/pokemon.repository';
import { firstValueFrom } from 'rxjs';
import { PokemonInterface } from './interface/pokemon.interface';
import { PokemonFetchQ } from './dtos/pokemon-fetch.dto';

@Injectable()
export class PokemonService {
  constructor(
    private readonly pokemonRepo: PokemonRepository,
    private readonly httpService: HttpService,
  ) {}

  sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  async getPokemons(
    query: PaginationParamsDto,
  ): Promise<DataAndPagination<PokemonMiniDTO[]>> {
    const [data, count] = await this.pokemonRepo.findAndCount({
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });
    const meta: PaginationResponseDto = {
      page: query.page,
      count: count,
      maxPage: Math.ceil(count / query.limit),
    };
    return { data: plainToInstance(PokemonMiniDTO, data), meta };
  }

  async getPokemonMiniSingle(natDex: number): Promise<PokemonMiniDTO> {
    const p = await this.pokemonRepo.getByNatDex(natDex);
    if (p) {
      return plainToInstance(PokemonMiniDTO, p);
    } else {
      throw new NotFoundException(
        null,
        `Pokemon with nat dex ${natDex} not found`,
      );
    }
  }

  async fetchPokemonsFromPokeApi(query: PokemonFetchQ): Promise<void> {
    console.log('START FETCH FROM ', query.start, ' TO ', query.stop);
    for (let i = query.start; i < query.stop + 1; i++) {
      try {
        const res = await firstValueFrom(
          this.httpService.get<PokemonInterface>(
            'https://pokeapi.co/api/v2/pokemon/' + i,
          ),
        );
        await this.savePokemonFromPokeApi(res.data);
      } catch (e) {
        console.log('err at ', i, ': ', e);
      }
      console.log(`finished ${i}, sleep 1 sec`);
      await this.sleep(1000);
    }
  }

  private async savePokemonFromPokeApi(
    pokemon: PokemonInterface,
  ): Promise<void> {
    const types: string[] = [];
    pokemon.types.forEach((p) => {
      types.push(p.type.name);
    });
    const p = await this.pokemonRepo.getByNatDex(pokemon.id);
    if (p) {
    } else {
      this.pokemonRepo.save({
        name: pokemon.name,
        natDex: pokemon.id,
        types,
        officialArtwork:
          pokemon.sprites.other['official-artwork'].front_default,
        spriteDefault: pokemon.sprites.front_default,
        spriteDream: pokemon.sprites.other.dream_world.front_default,
      });
    }
  }
}
