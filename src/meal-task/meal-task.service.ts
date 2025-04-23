import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MealTaskRepository } from './meal-task.repository';
import { MealTaskDto } from './dto/create-meal-task.dto';
import { MealTask } from './meal-task.entity';
import { MealStatus } from './enum/delivery.enum';
import { StaffRepository } from 'src/staff/staff.repository';
import { StaffRole } from 'src/staff/staff-roles.enum';
import { Users } from 'src/auth/users.entity';
import { UpdateMealStatusDto } from './dto/update-meal-task.dto';

@Injectable()
export class MealTaskService {
  constructor(
    private mealTaskRepository: MealTaskRepository,
    private staffRepository: StaffRepository,
  ) {}

  async assignMealTask(
    mealTaskDto: MealTaskDto,
    user: Users,
  ): Promise<MealTask> {
    const { patientId, staffId, dietChartId } = mealTaskDto;
    //Changing the staff role to staff meal role
    const staff = await this.staffRepository.findOne({
      where: { id: staffId },
    });
    if (!staff) {
      throw new NotFoundException('Staff is not found in database');
    }
    staff.staffRoles = StaffRole.MEAL;
    await this.staffRepository.save(staff);

    //Assign task to staff
    const meal = this.mealTaskRepository.create({
      patient: { id: patientId },
      assignedStaff: { id: staffId },
      diet: { id: dietChartId },
      preparationStatus: MealStatus.PENDING,
      deliveryStatus: MealStatus.PENDING,
      user,
    });
    await this.mealTaskRepository.save(meal);
    return meal;
  }

  //Update MealTask
  async updateMealTaskStaff(
    dto: UpdateMealStatusDto,
    user: Users,
  ): Promise<MealTask> {
    const { mealTaskId, status, mealType, statusType } = dto;

    const mealTask = await this.mealTaskRepository.findOne({
      where: { id: mealTaskId },
    });
    console.log('Assigned Staff User ID:', mealTask.assignedStaff?.user?.id);
    console.log('Current User ID:', user.id);
    if (!mealTask) {
      throw new NotFoundException('Meal task is not found');
    }

    if (mealTask.assignedStaff.user.id !== user.id) {
      throw new ForbiddenException('You are not allowed to update this task');
    }

    if (statusType !== 'preparation') {
      throw new BadRequestException('Only preparation status can be updated');
    }
    if (mealType === 'morning') {
      if (statusType === 'preparation')
        mealTask.morningPreparationStatus = status;
    } else if (mealType === 'evening') {
      if (statusType === 'preparation')
        mealTask.eveningPreparationStatus = status;
    } else if (mealType === 'night') {
      if (statusType === 'preparation')
        mealTask.nightPreparationStatus = status;
    } else {
      throw new BadRequestException('Invalid mealType or statusType provided');
    }
    await this.mealTaskRepository.save(mealTask);
    return mealTask;
  }
  //update Task delivery
  async updateMealTaskDelivery(
    dto: UpdateMealStatusDto,
    user: Users,
  ): Promise<MealTask> {
    const { mealTaskId, status, mealType, statusType } = dto;

    const mealTask = await this.mealTaskRepository.findOne({
      where: { id: mealTaskId, user },
    });
    if (!mealTask) {
      throw new NotFoundException('Meal task is not found');
    }
    if (mealType === 'morning') {
      if (statusType === 'delivery') mealTask.morningDeliveryStatus = status;
    } else if (mealType === 'evening') {
      if (statusType === 'delivery') mealTask.eveningDeliveryStatus = status;
    } else if (mealType === 'night') {
      if (statusType === 'delivery') mealTask.nightDeliveryStatus = status;
    } else {
      throw new BadRequestException('Invalid mealType or statusType provided');
    }
    await this.mealTaskRepository.save(mealTask);
    return mealTask;
  }

  async getMealTaskStatus(id: string, user: Users): Promise<MealTask> {
    const meal = await this.mealTaskRepository.findOne({ where: { id, user } });
    if (!meal) {
      throw new NotFoundException('Id is not found in database');
    }
    return meal;
  }
}
