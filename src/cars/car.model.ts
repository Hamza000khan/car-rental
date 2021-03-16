export interface Car {
  carLicenseNumber: string;
  Manufacturer: string;
  Model: string;
  city: string;
  basePrice: number;
  pricePerHour: number;
  securityDeposit: number;
  status: CarStatus;
  bookedOn: Date | null;
  bookedTill: Date | null;
}

export enum CarStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}
