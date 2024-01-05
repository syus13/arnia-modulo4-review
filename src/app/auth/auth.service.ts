import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/databases/entities/User.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private userService: UsersService,

    private jwtService: JwtService,
  ) {}

  async register(userRegisterDto: UserRegisterDto) {
    try {
      const user = this.userRepository.create(userRegisterDto);

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async login(userLoginDto: UserLoginDto) {
    try {
      const user = await this.userService.findUserByEmail(userLoginDto.email);

      if (!user) {
        throw new UnauthorizedException();
      }

      const passwordVerification = await bcrypt.compare(
        userLoginDto.password,
        user.password,
      );

      if (!passwordVerification) {
        throw new UnauthorizedException();
      }

      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      const token = await this.jwtService.signAsync(payload);

      return {
        access_token: token,
      };
    } catch (error) {
      throw new HttpException(
        error?.message || 'UNAUTHORIZED',
        error?.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }
}