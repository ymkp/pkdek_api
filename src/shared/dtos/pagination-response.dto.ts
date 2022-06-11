import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

export class PaginationResponseDto {
  @Expose()
  @ApiProperty()
  page: number;

  @Expose()
  @ApiProperty()
  maxPage: number;

  @Expose()
  @ApiProperty()
  count: number;
}

// @Exclude()
// export class DataAndCountDTO<T> {
//   @Expose()
//   @ApiProperty()
//   data: T;

//   @Expose()
//   @ApiProperty()
//   count: number;
// }

@Exclude()
export class DataAndPagination<T> {
  @Expose()
  @ApiProperty()
  data: T;

  @Expose()
  @ApiProperty()
  meta: PaginationResponseDto;
}