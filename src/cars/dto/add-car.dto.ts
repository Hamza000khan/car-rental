import { IsNotEmpty, IsDate } from 'class-validator';

export class AddCarDto {
  @IsNotEmpty()
  carLicenseNumber: string;

  @IsNotEmpty()
  Manufacturer: string;

  @IsNotEmpty()
  Model: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  basePrice: number;

  @IsNotEmpty()
  pricePerHour: number;

  @IsNotEmpty()
  securityDeposit: number;
}
