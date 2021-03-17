import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarStatus } from './car-status.enum';
import { Car } from './car.entity';
import { CarRepository } from './car.repository';
import { AddCarDto } from './dto/add-car.dto';
import { getCarsFilterDto } from './dto/get-cars-filter.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarRepository) private carRepository: CarRepository,
  ) {}
  // getAllCars(): Car[] {
  //   return this.cars;
  // }
  // getCarsWithFilters(filterDto: getCarsFilterDto): Car[] {
  //   const { status } = filterDto;
  //   let cars = this.cars;
  //   if (status) {
  //     cars = cars.filter((car) => car.status === status);
  //   } else {
  //     return cars;
  //   }
  //   return cars;
  // }

  async getCarById(carLicenseNumber: string): Promise<Car> {
    const found = await this.carRepository.findOne(carLicenseNumber);
    if (!found) {
      throw new NotFoundException(
        `Car with Plate Number ${carLicenseNumber} not found`,
      );
    }
    return found;
  }

  // updateCarStatus(carLicenseNumber: string, status: CarStatus): Car[] {
  //   const car = this.getCarById(carLicenseNumber);
  //   car.status = status;
  //   return this.cars;
  // }

  async addCars(addCarDto: AddCarDto): Promise<Car> {
    const {
      carLicenseNumber,
      Manufacturer,
      Model,
      city,
      basePrice,
      pricePerHour,
      securityDeposit,
    } = addCarDto;
    const car = new Car();
    car.carLicenseNumber = carLicenseNumber;
    car.Manufacturer = Manufacturer;
    car.Model = Model;
    car.city = city;
    car.basePrice = basePrice;
    car.pricePerHour = pricePerHour;
    car.securityDeposit = securityDeposit;
    car.status = CarStatus.AVAILABLE;
    await car.save();
    return car;
  }

  // deleteCar(carLicenseNumber: string): Car[] {
  //   const found = this.getCarById(carLicenseNumber);
  //   this.cars = this.cars.filter(
  //     (car) => car.carLicenseNumber !== found.carLicenseNumber,
  //   );
  //   return this.cars;
  // }
}
