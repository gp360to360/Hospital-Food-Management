import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from './roles.enum';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.MANAGER })
  role: UserRoles;
}
