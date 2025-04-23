import { Injectable } from '@nestjs/common';
import { DeliveryRepository } from './delivery.repository';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Delivery } from './delivery.entity';
import { Users } from 'src/auth/users.entity';

@Injectable()
export class DeliveryService {
  constructor(private deliveryRepository: DeliveryRepository) {}
  createDelivery(
    createDeliverDto: CreateDeliveryDto,
    user: Users,
  ): Promise<Delivery> {
    return this.deliveryRepository.createDeilvery(createDeliverDto, user);
  }
}
