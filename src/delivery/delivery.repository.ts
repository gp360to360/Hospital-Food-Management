import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Delivery } from './delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Users } from 'src/auth/users.entity';

@Injectable()
export class DeliveryRepository extends Repository<Delivery> {
  constructor(private dataSource: DataSource) {
    super(Delivery, dataSource.createEntityManager());
  }
  async createDeilvery(
    createDeliveryDto: CreateDeliveryDto,
    user: Users,
  ): Promise<Delivery> {
    const delivery = this.create({ ...createDeliveryDto, user });
    await this.save(delivery);
    return delivery;
  }
}
