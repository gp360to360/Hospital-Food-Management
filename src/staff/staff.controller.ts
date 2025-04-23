import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { Staff } from './staff.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { GetUser, Roles } from 'src/auth/get-user.decorator';
import { UserRoles } from 'src/auth/roles.enum';
import { Users } from 'src/auth/users.entity';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Post()
  @Roles(UserRoles.MANAGER)
  createStaff(
    @Body() createStaffDto: CreateStaffDto,
    @GetUser() user: Users,
  ): Promise<Staff> {
    return this.staffService.createStaff(createStaffDto, user);
  }
}
