import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto';
import { DataAndPagination } from 'src/shared/dtos/pagination-response.dto';
import { PokemonFetchQ } from './dtos/pokemon-fetch.dto';
import { PokemonMiniDTO } from './dtos/pokemon-mini.dto';
import { PokemonService } from './pokemon.service';

@ApiTags('Pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly service: PokemonService) {}

  @Get()
  @ApiOperation({ summary: 'get pokemons' })
  async getPokemons(
    @Query() query: PaginationParamsDto,
  ): Promise<DataAndPagination<PokemonMiniDTO[]>> {
    return await this.service.getPokemons(query);
  }

  @Post()
  @ApiOperation({ summary: 'fetch pokemon data from poke api' })
  async fetchPokemons(@Query() query: PokemonFetchQ): Promise<void> {
    await this.service.fetchPokemonsFromPokeApi(query);
  }

  @Get('/:natDexOrName')
  @ApiOperation({ summary: 'get pokemon by nat dex or name' })
  async getPokemonMiniByNatDex(
    @Param('natDexOrName') input: string,
  ): Promise<PokemonMiniDTO> {
    return await this.service.getPokemonMiniSingle(input);
  }
}
