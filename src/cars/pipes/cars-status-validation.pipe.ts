import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CarStatus } from '../car.model';

export class CarStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [CarStatus.AVAILABLE, CarStatus.UNAVAILABLE];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is not a valid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
