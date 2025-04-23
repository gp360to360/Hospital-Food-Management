import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MealTask } from './meal-task.entity';

@Injectable()
export class MealTaskRepository extends Repository<MealTask> {
  constructor(private dataSource: DataSource) {
    super(MealTask, dataSource.createEntityManager());
  }
}
