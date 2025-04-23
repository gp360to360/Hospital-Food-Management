import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MealStatus } from './enum/delivery.enum';
import { Patient } from 'src/patient/patient.entity';
import { DietChart } from 'src/food_chart/food.entity';
import { Staff } from 'src/staff/staff.entity';
import { Users } from 'src/auth/users.entity';

@Entity()
export class MealTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient)
  patient: Patient;

  @ManyToOne(() => DietChart)
  diet: DietChart;

  @ManyToOne(() => Staff)
  assignedStaff: Staff;

  @ManyToOne(() => Users, { eager: false })
  user: Users;

  @Column({ type: 'enum', enum: MealStatus })
  preparationStatus: MealStatus;

  @Column({ type: 'enum', enum: MealStatus })
  deliveryStatus: MealStatus;

  @Column({ nullable: true })
  deliveryNotes: string;

  @Column({ type: 'timestamp', nullable: true })
  deliveredAt: Date;

  @Column({ type: 'enum', enum: MealStatus, default: MealStatus.PENDING })
  morningPreparationStatus: MealStatus;

  @Column({ type: 'enum', enum: MealStatus, default: MealStatus.PENDING })
  eveningPreparationStatus: MealStatus;

  @Column({ type: 'enum', enum: MealStatus, default: MealStatus.PENDING })
  nightPreparationStatus: MealStatus;

  @Column({ type: 'enum', enum: MealStatus, default: MealStatus.PENDING })
  morningDeliveryStatus: MealStatus;

  @Column({ type: 'enum', enum: MealStatus, default: MealStatus.PENDING })
  eveningDeliveryStatus: MealStatus;

  @Column({ type: 'enum', enum: MealStatus, default: MealStatus.PENDING })
  nightDeliveryStatus: MealStatus;
}
