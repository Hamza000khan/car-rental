import { ApiProperty } from '@nestjs/swagger';
import { isIn, IsOptional } from 'class-validator';
import { CarStatus } from '../car-status.enum';

export class getCarsFilterDto {
  @IsOptional()
  @ApiProperty({ type: String, description: 'Car Status' })
  status: CarStatus;
}
