import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { CarStatus } from './car.model';

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
  bookedOn: Date;

  @Column()
  bookedTill: Date;

  @Column()
  status: CarStatus;
}