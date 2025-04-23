import { Injectable } from '@nestjs/common';
import { PatientRepository } from './patient.repository';
import { createPatientDto } from './dto/create-patient.dto';
import { Patient } from './patient.entity';
import { Users } from 'src/auth/users.entity';

@Injectable()
export class PatientService {
  constructor(private patientRepository: PatientRepository) {}
  createPatient(
    createPatientDto: createPatientDto,
    user: Users,
  ): Promise<Patient> {
    return this.patientRepository.createPatient(createPatientDto, user);
  }
}
