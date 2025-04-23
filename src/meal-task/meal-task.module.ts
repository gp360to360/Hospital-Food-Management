import { Module } from '@nestjs/common';
import { MealTaskController } from './meal-task.controller';
import { MealTaskService } from './meal-task.service';
import { MealTaskRepository } from './meal-task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealTask } from './meal-task.entity';
import { Staff } from 'src/staff/staff.entity';
import { StaffRepository } from 'src/staff/staff.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MealTask, Staff])],
  controllers: [MealTaskController],
  providers: [MealTaskService, MealTaskRepository, StaffRepository],
})
export class MealTaskModule {}
