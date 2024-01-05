import { Repository } from 'typeorm';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/User.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepostory: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.userRepostory.find();
  }

  async findOne(id: number) {
    try {
      return await this.userRepostory.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  findUserByEmail(email: string) {
    try {
      return this.userRepostory.findOneOrFail({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
        },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { affected } = await this.userRepostory.update(id, updateUserDto);

      if (affected === 0) {
        throw new BadRequestException();
      }

      const user = await this.findOne(id);
      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
