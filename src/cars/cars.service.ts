import { Injectable } from '@nestjs/common';
import { Car, CarStatus } from './car.model';
import { AddCarDto } from './dto/add-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [];

  getAllCars(): Car[] {
    return this.cars;
  }

  addCars(addCarDto: AddCarDto): Car {
    const {
      carLicenseNumber,
      Manufacturer,
      Model,
      city,
      basePrice,
      pricePerHour,
      securityDeposit,
    } = addCarDto;
    const car: Car = {
      carLicenseNumber,
      Manufacturer,
      Model,
      city,
      basePrice,
      pricePerHour,
      securityDeposit,
      status: CarStatus.AVAILABLE,
    };
    this.cars.push(car);
    return car;
  }
}
