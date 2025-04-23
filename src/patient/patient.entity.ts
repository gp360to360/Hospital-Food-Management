import { Exclude } from 'class-transformer';
import { Users } from 'src/auth/users.entity';
import { DietChart } from 'src/food_chart/food.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  diseases: string;

  @Column('text')
  allergies: string;

  @Column()
  roomNumber: string;

  @Column()
  bedNumber: string;

  @Column()
  floorNumber: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  contactInfo: string;

  @Column()
  emergencyContact: string;

  @ManyToOne(() => Users)
  @Exclude({ toPlainOnly: true })
  user: Users;

  @OneToMany(() => DietChart, (dietChart) => dietChart.patient)
  dietChart: DietChart[];
}
