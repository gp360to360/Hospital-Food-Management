import { Module } from '@nestjs/common';
import { FoodChartController } from './food_chart.controller';
import { FoodChartService } from './food_chart.service';
import { FoodChartRepositories } from './food-chart.repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DietChart } from './food.entity';
import { PatientRepository } from 'src/patient/patient.repository';
import { Patient } from 'src/patient/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DietChart, Patient])],
  controllers: [FoodChartController],
  providers: [FoodChartService, FoodChartRepositories, PatientRepository],
})
export class FoodChartModule {}
