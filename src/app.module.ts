import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffModule } from './staff/staff.module';
import { DeliveryModule } from './delivery/delivery.module';
import { PatientModule } from './patient/patient.module';
import { FoodChartModule } from './food_chart/food_chart.module';
import { MealTaskModule } from './meal-task/meal-task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '',
      username: '',
      password: '',
      database: 'hospital',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    StaffModule,
    DeliveryModule,
    PatientModule,
    FoodChartModule,
    MealTaskModule,
  ],
})
export class AppModule {}
