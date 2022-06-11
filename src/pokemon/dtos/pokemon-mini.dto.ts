import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
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

  // @Expose()
  // @ApiProperty()
  // spriteDefault: string;

  // @Expose()
  // @ApiProperty()
  // spriteDream: string;

  // @Expose()
  // @ApiProperty()
  // officialArtwork: string;
}
