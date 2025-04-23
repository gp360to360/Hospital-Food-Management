import { IsNotEmpty, IsString } from 'class-validator';

export class FoodChartDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  morningMeal: string;

  @IsString()
  morningIngredients: string;

  @IsString()
  eveningMeal: string;

  @IsString()
  eveningIngredients: string;

  @IsString()
  nightMeal: string;

  @IsString()
  nightIngredients: string;

  @IsString()
  instructions: string;

  @IsString()
  date: string;
}
