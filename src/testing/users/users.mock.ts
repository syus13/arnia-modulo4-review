import { USER_ROLE } from '../../enums/user-role.enum';

export const userMock = {
  id: 1,
  name: 'Guilherme',
  email: 'syus13@gmail.com',
  password: '0102',
  role: USER_ROLE.SELLER,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const usersMock = [userMock];
