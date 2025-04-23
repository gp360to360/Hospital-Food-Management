import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FoodChartService } from './food_chart.service';
import { FoodChartDto } from './dto/create-food-chart.dto';
import { DietChart } from './food.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { GetUser, Roles } from 'src/auth/get-user.decorator';
import { Users } from 'src/auth/users.entity';
import { UserRoles } from 'src/auth/roles.enum';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('food-chart')
export class FoodChartController {
  constructor(private foodChartService: FoodChartService) {}

  @Post()
  @Roles(UserRoles.MANAGER)
  createFoodChart(
    @Body() foodChartDto: FoodChartDto,
    @GetUser() user: Users,
  ): Promise<DietChart> {
    return this.foodChartService.createFoodChart(foodChartDto, user);
  }
}
