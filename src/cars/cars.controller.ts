import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Car, CarStatus } from './car.model';
import { CarsService } from './cars.service';
import { AddCarDto } from './dto/add-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getAllCars(): Car[] {
    return this.carsService.getAllCars();
  }

  @Get('/:carLicenseNumber')
  getCarbyPlateNumber(
    @Param('carLicenseNumber') carLicenseNumber: string,
  ): Car {
    return this.carsService.getCarById(carLicenseNumber);
  }

  @Post()
  addCar(@Body() addCarDto: AddCarDto): Car {
    return this.carsService.addCars(addCarDto);
  }

  @Patch('/:carLicenseNumber/:status')
  upadteCarStatus(
    @Param('carLicenseNumber') carLicenseNumber: string,
    @Param('status') status: CarStatus,
  ) {
    return this.carsService.updateCarStatus(carLicenseNumber, status);
  }

  @Delete('/:carLicenseNumber')
  deleteCar(@Param('carLicenseNumber') carLicenseNumber: string): Car[] {
    return this.carsService.deleteCar(carLicenseNumber);
  }
}
