import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from 'src/databases/entities/House.entity';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([House]), UsersModule],
  controllers: [HousesController],
  providers: [HousesService],
})
export class HousesModule {}