import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CarRepository } from './car.repository';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarRepository]), AuthModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
