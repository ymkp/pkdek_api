import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PokemonMiniDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  natDex: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  types: string[];

  @Expose()
  @ApiProperty()
  spriteDefault: string;

  @Expose()
  @ApiProperty()
  spriteDream: string;

  @Expose()
  @ApiProperty()
  officialArtwork: string;
}
