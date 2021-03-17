import { isIn, IsOptional } from 'class-validator';
import { CarStatus } from '../car.model';

export class getCarsFilterDto {
  @IsOptional()
  status: CarStatus;
}
