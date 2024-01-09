import { UsersService } from '../../app/users/users.service';
import { userMock } from './users.mock';

export const userServiceMock = {
  provide: UsersService,
  useValue: {
    findUserByEmail: jest.fn().mockResolvedValue(userMock),
  },
};
