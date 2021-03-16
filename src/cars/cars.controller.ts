import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Car, CarStatus } from './car.model';
import { CarsService } from './cars.service';
import { AddCarDto } from './dto/add-car.dto';
import { getCarsFilterDto } from './dto/get-cars-filter.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getCars(@Query() filterDto: getCarsFilterDto): Car[] {
    if (Object.keys(filterDto).length) {
      return this.carsService.getCarsWithFilters(filterDto);
    } else {
      return this.carsService.getAllCars();
    }
  }

  @Get('/:carLicenseNumber')
  getCarbyPlateNumber(
    @Param('carLicenseNumber') carLicenseNumber: string,
  ): Car {
    return this.carsService.getCarById(carLicenseNumber);
  }

  @Post()
  @UsePipes(ValidationPipe)
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
