import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { createPatientDto } from './dto/create-patient.dto';
import { Patient } from './patient.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { GetUser, Roles } from 'src/auth/get-user.decorator';
import { UserRoles } from 'src/auth/roles.enum';
import { Users } from 'src/auth/users.entity';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post()
  @Roles(UserRoles.MANAGER)
  createPatient(
    @Body() createPatientDto: createPatientDto,
    @GetUser() user: Users,
  ): Promise<Patient> {
    return this.patientService.createPatient(createPatientDto, user);
  }
}
