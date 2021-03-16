import { Injectable } from '@nestjs/common';
import { Car, CarStatus } from './car.model';

@Injectable()
export class CarsService {
  private cars: Car[] = [];

  getAllCars(): Car[] {
    return this.cars;
  }

  addCars(
    carLicenseNumber: string,
    Manufacturer: string,
    Model: string,
    city: string,
    basePrice: number,
    pricePerHour: number,
    securityDeposit: number,
  ): Car {
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
