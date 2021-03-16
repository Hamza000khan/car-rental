export interface Car {
  carLicenseNumber: string;
  Manufacturer: string;
  Model: string;
  city: string;
  basePrice: number;
  pricePerHour: number;
  securityDeposit: number;
  status: CarStatus;
}

export enum CarStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}
