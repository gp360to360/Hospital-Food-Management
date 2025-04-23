import { IsNotEmpty, IsUUID } from 'class-validator';

export class MealTaskDto {
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @IsUUID()
  @IsNotEmpty()
  dietChartId: string;

  @IsUUID()
  @IsNotEmpty()
  staffId: string;
}
