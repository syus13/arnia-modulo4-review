import { Reflector } from '@nestjs/core';
import { USER_ROLE } from 'src/enums/user-role.enum';

export const Roles = Reflector.createDecorator<USER_ROLE[]>();
