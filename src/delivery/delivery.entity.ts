import { Exclude } from 'class-transformer';
import { Users } from 'src/auth/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  contactInfo: string;

  @Column({ nullable: true })
  otherDetails: string;

  @ManyToOne(() => Users, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: Users;
}
