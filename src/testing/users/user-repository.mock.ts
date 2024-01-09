import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../databases/entities/User.entity';
import { userMock } from './users.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    create: jest.fn().mockReturnValue(userMock),
    save: jest.fn(),
  },
};
