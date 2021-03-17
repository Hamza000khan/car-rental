import { EntityRepository, Repository } from 'typeorm';
import { Car } from './car.entity';

@EntityRepository()
export class CarRepository extends Repository<Car> {}
