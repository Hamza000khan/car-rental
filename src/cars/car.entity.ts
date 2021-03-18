import { type, userInfo } from 'node:os';
import { User } from 'src/auth/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CarStatus } from './car-status.enum';

@Entity()
export class Car extends BaseEntity {
  @PrimaryColumn()
  carLicenseNumber: string;

  @Column()
  Manufacturer: string;

  @Column()
  Model: string;

  @Column()
  city: string;

  @Column()
  basePrice: number;

  @Column()
  pricePerHour: number;

  @Column()
  securityDeposit: number;

  @Column()
  status: CarStatus;

  @ManyToOne((type) => User, (user) => user.cars, { eager: false })
  user: User;

  @Column()
  userId: number;
}
