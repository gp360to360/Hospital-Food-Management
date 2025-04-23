import { Exclude } from 'class-transformer';
import { Users } from 'src/auth/users.entity';
import { Patient } from 'src/patient/patient.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class DietChart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string; // optional: can also be Date type

  @Column()
  morningMeal: string;

  @Column()
  morningIngredients: string;

  @Column()
  eveningMeal: string;

  @Column()
  eveningIngredients: string;

  @Column()
  nightMeal: string;

  @Column()
  nightIngredients: string;

  @Column({ nullable: true })
  instructions: string;

  @ManyToOne(() => Patient, (patient) => patient.dietChart, {
    onDelete: 'CASCADE',
  })
  patient: Patient;

  @ManyToOne(() => Users)
  @Exclude({ toPlainOnly: true })
  user: Users;
}
