import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { SharedModule } from './shared';

@Module({
  imports: [PokemonModule, SharedModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
