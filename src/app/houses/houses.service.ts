import { Repository } from 'typeorm';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from 'src/databases/entities/House.entity';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House)
    private houseRepository: Repository<House>,

    private userService: UsersService,
  ) {}

  async create(createHouseDto: CreateHouseDto) {
    try {
      const owner = await this.userService.findOne(createHouseDto.ownerdId);

      const house = this.houseRepository.create(createHouseDto);

      house.owner = owner;

      await this.houseRepository.save(house);

      return house;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const houses = await this.houseRepository.find({
        relations: {
          owner: true,
        },
      });
      return houses;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException();
    }
    try {
      const house = await this.houseRepository.findOneByOrFail({ id });

      return house;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  update(id: number, updateHouseDto: UpdateHouseDto) {
    return `This action updates a #${id} house`;
  }

  remove(id: number) {
    return `This action removes a #${id} house`;
  }
}
