import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/ceate-user.dto';

import * as bcyrpt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { username, password, role } = createUserDto;
    const salt = await bcyrpt.genSalt();
    const hashedPassword = await bcyrpt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword, role });
    // await this.save(user);
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('this user is already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    user;
  }
}
