import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Delivery } from './delivery.entity';
import { DeliveryRepository } from './delivery.repository';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { GetUser, Roles } from 'src/auth/get-user.decorator';
import { UserRoles } from 'src/auth/roles.enum';
import { Users } from 'src/auth/users.entity';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryRepository: DeliveryRepository) {}

  @Post()
  @Roles(UserRoles.STAFF)
  createDelivery(
    @Body() createDeliveryDto: CreateDeliveryDto,
    @GetUser() user: Users,
  ): Promise<Delivery> {
    return this.deliveryRepository.createDeilvery(createDeliveryDto, user);
  }
}
