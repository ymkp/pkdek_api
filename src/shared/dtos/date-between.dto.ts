import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class DateBetweenDTO {
  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  firstDate: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  lastDate: string;
}
