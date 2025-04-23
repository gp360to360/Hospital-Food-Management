import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/ceate-user.dto';
import { Users } from './users.entity';
import * as bcyrpt from 'bcrypt';
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }
  async signIn(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const { username, password, role } = createUserDto;
    const user = await this.userRepository.findOne({
      where: { username, role },
    });
    if (user && bcyrpt.compare(password, user.password)) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new NotFoundException('User is not found check credentials');
    }
  }
}
