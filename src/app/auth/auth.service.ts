import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/User.entity';
import { UserRegisterDto } from './dto/user-register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
}
