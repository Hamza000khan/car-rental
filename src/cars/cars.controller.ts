import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CarStatus } from './car-status.enum';
import { Car } from './car.entity';
import { CarsService } from './cars.service';
import { AddCarDto } from './dto/add-car.dto';
import { getCarsFilterDto } from './dto/get-cars-filter.dto';
import { CarStatusValidationPipe } from './pipes/cars-status-validation.pipe';

@Controller('cars')
@UseGuards(AuthGuard())
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getCars(
    @Query() filterDto: getCarsFilterDto,
    @GetUser() user: User,
  ): Promise<Car[]> {
    return this.carsService.getCars(filterDto, user);
  }

  @Get('/:carLicenseNumber')
  getCarbyPlateNumber(
    @Param('carLicenseNumber') carLicenseNumber: string,
    @GetUser() user: User,
  ): Promise<Car> {
    return this.carsService.getCarById(carLicenseNumber, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  addCar(@Body() addCarDto: AddCarDto, @GetUser() user: User): Promise<Car> {
    return this.carsService.addCars(addCarDto, user);
  }

  @Patch('/:carLicenseNumber/status')
  upadteCarStatus(
    @Param('carLicenseNumber') carLicenseNumber: string,
    @Body('status', CarStatusValidationPipe) status: CarStatus,
    @GetUser() user: User,
  ) {
    return this.carsService.updateCarStatus(carLicenseNumber, status, user);
  }

  @Delete('/:carLicenseNumber')
  deleteCar(
    @Param('carLicenseNumber') carLicenseNumber: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.carsService.deleteCar(carLicenseNumber, user);
  }
}
