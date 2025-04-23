import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { createPatientDto } from './dto/create-patient.dto';
import { Users } from 'src/auth/users.entity';

@Injectable()
export class PatientRepository extends Repository<Patient> {
  constructor(private dataSource: DataSource) {
    super(Patient, dataSource.createEntityManager());
  }
  async createPatient(
    createPaitentDto: createPatientDto,
    user: Users,
  ): Promise<Patient> {
    const patient = this.create({ ...createPaitentDto, user });
    await this.save(patient);
    return patient;
  }
}
