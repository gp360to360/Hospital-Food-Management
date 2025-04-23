import { MealStatus } from '../enum/delivery.enum';

export class UpdateMealStatusDto {
  mealTaskId: string;
  mealType: 'morning' | 'evening' | 'night';
  statusType: 'preparation' | 'delivery';
  status: MealStatus;
}
