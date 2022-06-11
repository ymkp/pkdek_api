import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { TypeOrmExModule } from 'src/shared/typeorm-ex.module';
import { PokemonRepository } from './repositories/pokemon.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    HttpModule,
    TypeOrmExModule.forCustomRepository([PokemonRepository]),
    // TypeOrmModule.forFeature([PokemonRepository]),
  ],
  providers: [PokemonService],
  controllers: [PokemonController],
  exports: [PokemonService],
})
export class PokemonModule {}
