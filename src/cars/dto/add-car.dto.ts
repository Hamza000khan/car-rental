import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate } from 'class-validator';

export class AddCarDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'License Number' })
  carLicenseNumber: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Manufacturer' })
  Manufacturer: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Car Model' })
  Model: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'City' })
  city: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'Base Price' })
  basePrice: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'Price Per Hour' })
  pricePerHour: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'Security Deposit' })
  securityDeposit: number;
}
