import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from './cars/cars.module';
import { typeOrmConfig } from './config/typeorm-config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CarsModule],
})
export class AppModule {}
