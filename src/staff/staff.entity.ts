import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StaffRole } from './staff-roles.enum';
import { Users } from 'src/auth/users.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  contactInfo: string;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: StaffRole, default: StaffRole.NONE })
  staffRoles: StaffRole;

  @ManyToOne(() => Users)
  @Exclude({ toPlainOnly: true })
  user: Users;
}
