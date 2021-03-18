import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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

  async getCars(filterDto: getCarsFilterDto, user: User): Promise<Car[]> {
    return this.carRepository.getCars(filterDto, user);
  }

  async getCarById(carLicenseNumber: string, user: User): Promise<Car> {
    const found = await this.carRepository.findOne({
      where: { carLicenseNumber, userId: user.id },
    });
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
    user: User,
  ): Promise<Car> {
    const car = await this.getCarById(carLicenseNumber, user);
    car.status = status;
    await car.save();
    return car;
  }

  async addCars(addCarDto: AddCarDto, user: User): Promise<Car> {
    return this.carRepository.addCar(addCarDto, user);
  }

  async deleteCar(carLicenseNumber: string, user: User): Promise<void> {
    const result = await this.carRepository.delete({
      carLicenseNumber,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Car with Plate Number ${carLicenseNumber} not found`,
      );
    }
  }
}
