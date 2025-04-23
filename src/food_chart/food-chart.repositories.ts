import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DietChart } from './food.entity';

@Injectable()
export class FoodChartRepositories extends Repository<DietChart> {
  constructor(private dataSource: DataSource) {
    super(DietChart, dataSource.createEntityManager());
  }
}
