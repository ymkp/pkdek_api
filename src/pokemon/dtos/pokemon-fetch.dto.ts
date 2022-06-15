import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class PokemonFetchQ {
  @ApiPropertyOptional({
    description: 'start from nat dex : i',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  start = 1;

  @ApiProperty({
    description: 'stop on nat dex : i',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  stop = 1;
}
