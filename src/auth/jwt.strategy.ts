import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './users.repository';
import { JwtPayload } from './jwt.payload';
import { Users } from './users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'secrethai',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<Users> {
    const { username } = payload;
    const user: Users = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
