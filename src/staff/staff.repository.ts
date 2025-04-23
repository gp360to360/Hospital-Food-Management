import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Staff } from './staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { Users } from 'src/auth/users.entity';

@Injectable()
export class StaffRepository extends Repository<Staff> {
  constructor(private dataSource: DataSource) {
    super(Staff, dataSource.createEntityManager());
  }
  async createStaff(
    createStaffDto: CreateStaffDto,
    user: Users,
  ): Promise<Staff> {
    const staff = this.create({ ...createStaffDto, user });
    await this.save(staff);
    return staff;
  }
}
