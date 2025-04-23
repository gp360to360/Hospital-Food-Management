import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class createPatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  diseases: string;

  @IsString()
  @IsOptional()
  allergies: string;

  @IsString()
  @IsNotEmpty()
  roomNumber: string;

  @IsString()
  @IsNotEmpty()
  bedNumber: string;

  @IsString()
  @IsNotEmpty()
  floorNumber: string;

  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  contactInfo: string;

  @IsString()
  @IsNotEmpty()
  emergencyContact: string;
}
