import { Controller, Get } from '@nestjs/common';
import { Car } from './car.model';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getAllCars(): Car[] {
    return this.carsService.getAllCars();
  }
}
