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

  async getCars(filterDto: getCarsFilterDto): Promise<Car[]> {
    return this.carRepository.getCars(filterDto);
  }

  async getCarById(carLicenseNumber: string): Promise<Car> {
    const found = await this.carRepository.findOne(carLicenseNumber);
    if (!found) {
      throw new NotFoundException(
        `Car with Plate Number ${carLicenseNumber} not found`,
      );
    }
    return found;
  }

  async updateCarStatus(
    carLicenseNumber: string,
    status: CarStatus,
  ): Promise<Car> {
    const car = await this.getCarById(carLicenseNumber);
    car.status = status;
    await car.save();
    return car;
  }

  async addCars(addCarDto: AddCarDto): Promise<Car> {
    return this.carRepository.addCar(addCarDto);
  }

  async deleteCar(carLicenseNumber: string): Promise<void> {
    const result = await this.carRepository.delete(carLicenseNumber);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Car with Plate Number ${carLicenseNumber} not found`,
      );
    }
  }
}
