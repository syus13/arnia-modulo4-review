import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { tokenMock } from '../../testing/auth/token.mock';
import { userMock } from '../../testing/users/users.mock';
import { userLoginDtoMock } from '../../testing/auth/user-login.dto.mock';
import { userRepositoryMock } from '../../testing/users/user-repository.mock';
import { userServiceMock } from '../../testing/users/user-service.mock';
import { jwtServiceMock } from '../../testing/auth/jwt-service.mock';
import { userRegisterDtoMock } from 'src/testing/auth/user.register.dto.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        userServiceMock,
        jwtServiceMock,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('Should return a user registered', async () => {
      const result = await service.register(userRegisterDtoMock);

      expect(result).toEqual(userMock);
    });
  });

  describe('login', () => {
    it('Should return a token', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.login(userLoginDtoMock);

      expect(result).toEqual(tokenMock);
    });
  });
});
