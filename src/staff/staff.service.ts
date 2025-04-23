import { Injectable } from '@nestjs/common';
import { StaffRepository } from './staff.repository';
import { CreateStaffDto } from './dto/create-staff.dto';
import { Staff } from './staff.entity';
import { Users } from 'src/auth/users.entity';

@Injectable()
export class StaffService {
  constructor(private staffRepositry: StaffRepository) {}

  createStaff(createStaffDto: CreateStaffDto, user: Users): Promise<Staff> {
    return this.staffRepositry.createStaff(createStaffDto, user);
  }
}
