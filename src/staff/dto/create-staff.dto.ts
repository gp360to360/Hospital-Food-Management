import { IsEnum } from 'class-validator';
import { StaffRole } from '../staff-roles.enum';

export class CreateStaffDto {
  name: string;
  contactInfo: string;
  location: string;
  @IsEnum(StaffRole)
  staffRoles: StaffRole;
}
