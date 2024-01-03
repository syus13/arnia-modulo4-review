import { USER_ROLE } from 'src/enums/user-role.enum';

export class UserRegisterDto {
  name: string;

  email: string;

  password: string;

  role: USER_ROLE;
}
