import { Injectable, NotFoundException } from '@nestjs/common';
import { FoodChartRepositories } from './food-chart.repositories';
import { PatientRepository } from 'src/patient/patient.repository';
import { FoodChartDto } from './dto/create-food-chart.dto';
import { DietChart } from './food.entity';
import { Users } from 'src/auth/users.entity';

@Injectable()
export class FoodChartService {
  constructor(
    private foodChartRepo: FoodChartRepositories,
    private patientRepo: PatientRepository,
  ) {}

  async createFoodChart(
    createFoodChartDto: FoodChartDto,
    user: Users,
  ): Promise<DietChart> {
    const patient = await this.patientRepo.findOne({
      where: { id: createFoodChartDto.id },
    });
    if (!patient) {
      throw new NotFoundException('Patient with this id is not found');
    }
    const chart = this.foodChartRepo.create({
      ...createFoodChartDto,
      patient,
      user,
    });
    await this.foodChartRepo.save(chart);
    return chart;
  }
}
