import { isIn, IsOptional } from 'class-validator';
import { CarStatus } from '../car-status.enum';

export class getCarsFilterDto {
  @IsOptional()
  status: CarStatus;
}
