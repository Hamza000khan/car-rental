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
import { CarStatus } from './car-status.enum';
import { Car } from './car.entity';
import { CarsService } from './cars.service';
import { AddCarDto } from './dto/add-car.dto';
import { getCarsFilterDto } from './dto/get-cars-filter.dto';
import { CarStatusValidationPipe } from './pipes/cars-status-validation.pipe';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getCars(@Query() filterDto: getCarsFilterDto): Promise<Car[]> {
    return this.carsService.getCars(filterDto);
  }

  @Get('/:carLicenseNumber')
  getCarbyPlateNumber(
    @Param('carLicenseNumber') carLicenseNumber: string,
  ): Promise<Car> {
    return this.carsService.getCarById(carLicenseNumber);
  }

  @Post()
  @UsePipes(ValidationPipe)
  addCar(@Body() addCarDto: AddCarDto): Promise<Car> {
    return this.carsService.addCars(addCarDto);
  }

  @Patch('/:carLicenseNumber/status')
  upadteCarStatus(
    @Param('carLicenseNumber') carLicenseNumber: string,
    @Body('status', CarStatusValidationPipe) status: CarStatus,
  ) {
    return this.carsService.updateCarStatus(carLicenseNumber, status);
  }

  @Delete('/:carLicenseNumber')
  deleteCar(
    @Param('carLicenseNumber') carLicenseNumber: string,
  ): Promise<void> {
    return this.carsService.deleteCar(carLicenseNumber);
  }
}
