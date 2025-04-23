import {
  IsEnum,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoles } from '../roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  username: string;
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
  @IsEnum(UserRoles)
  role: UserRoles;
}
