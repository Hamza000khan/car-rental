import { Body, Controller, Get, Post } from '@nestjs/common';
import { Car } from './car.model';
import { CarsService } from './cars.service';
import { AddCarDto } from './dto/add-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getAllCars(): Car[] {
    return this.carsService.getAllCars();
  }

  @Post()
  addCar(@Body() addCarDto: AddCarDto): Car {
    return this.carsService.addCars(addCarDto);
  }
}
