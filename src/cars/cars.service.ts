import { Injectable, NotFoundException } from '@nestjs/common';
import { Car, CarStatus } from './car.model';
import { AddCarDto } from './dto/add-car.dto';
import { getCarsFilterDto } from './dto/get-cars-filter.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [];

  getAllCars(): Car[] {
    return this.cars;
  }

  getCarsWithFilters(filterDto: getCarsFilterDto): Car[] {
    const { status } = filterDto;
    let cars = this.cars;
    if (status) {
      cars = cars.filter((car) => car.status === status);
    } else {
      return cars;
    }
    return cars;
  }

  getCarById(carLicenseNumber: string): Car {
    const found = this.cars.find(
      (car) => car.carLicenseNumber === carLicenseNumber,
    );

    if (!found) {
      throw new NotFoundException(
        `Car with Plate Number ${carLicenseNumber} not found`,
      );
    }
    return found;
  }

  updateCarStatus(carLicenseNumber: string, status: CarStatus): Car[] {
    const car = this.getCarById(carLicenseNumber);
    car.status = status;
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
      bookedOn,
      bookedTill,
    } = addCarDto;
    const car: Car = {
      carLicenseNumber,
      Manufacturer,
      Model,
      city,
      basePrice,
      pricePerHour,
      securityDeposit,
      bookedOn,
      bookedTill,
      status: CarStatus.AVAILABLE,
    };
    this.cars.push(car);
    return car;
  }

  deleteCar(carLicenseNumber: string): Car[] {
    const found = this.getCarById(carLicenseNumber);
    this.cars = this.cars.filter(
      (car) => car.carLicenseNumber !== found.carLicenseNumber,
    );
    return this.cars;
  }
}
