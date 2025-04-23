import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MealTaskService } from './meal-task.service';
import { MealTaskDto } from './dto/create-meal-task.dto';
import { MealTask } from './meal-task.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { Users } from 'src/auth/users.entity';
import { GetUser, Roles } from 'src/auth/get-user.decorator';
import { UserRoles } from 'src/auth/roles.enum';
import { UpdateMealStatusDto } from './dto/update-meal-task.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('meal-task')
export class MealTaskController {
  constructor(private mealTaksService: MealTaskService) {}

  @Post('assign')
  @Roles(UserRoles.MANAGER)
  assignMealTask(
    @Body() mealTaskDto: MealTaskDto,
    @GetUser() user: Users,
  ): Promise<MealTask> {
    return this.mealTaksService.assignMealTask(mealTaskDto, user);
  }
  @Patch('status/update/staff')
  @Roles(UserRoles.STAFF)
  updateMealStatusStaff(
    @Body() dto: UpdateMealStatusDto,
    @GetUser() user: Users,
  ): Promise<MealTask> {
    return this.mealTaksService.updateMealTaskStaff(dto, user);
  }
  @Patch('status/update/delivery')
  @Roles(UserRoles.DELIVERY)
  updateMealStatusDelivery(
    @Body() dto: UpdateMealStatusDto,
    @GetUser() user: Users,
  ): Promise<MealTask> {
    return this.mealTaksService.updateMealTaskDelivery(dto, user);
  }
  @Get('/:id')
  @Roles(UserRoles.MANAGER)
  getMealTaskStatus(
    @Param('id') id: string,
    @GetUser() user: Users,
  ): Promise<MealTask> {
    return this.mealTaksService.getMealTaskStatus(id, user);
  }
}
