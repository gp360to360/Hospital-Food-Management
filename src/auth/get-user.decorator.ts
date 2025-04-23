import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Users } from './users.entity';
import { UserRoles } from './roles.enum';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Users => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
