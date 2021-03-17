import { EntityRepository, Repository } from 'typeorm';
import { CarStatus } from './car-status.enum';
import { Car } from './car.entity';
import { AddCarDto } from './dto/add-car.dto';
import { getCarsFilterDto } from './dto/get-cars-filter.dto';

@EntityRepository(Car)
export class CarRepository extends Repository<Car> {
  async getCars(filterDto: getCarsFilterDto): Promise<Car[]> {
    const { status } = filterDto;
    const query = this.createQueryBuilder('car');

    if (status) {
      query.andWhere('car.status = :status', { status });
    }

    const cars = await query.getMany();
    return cars;
  }
  async addCar(addCarDto: AddCarDto): Promise<Car> {
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
}
