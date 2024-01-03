import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { USER_ROLE } from '../../enums/user-role.enum';
import { House } from './House.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => House, (house) => house.seller)
  houses: House[];

  @OneToMany(() => House, (house) => house.owner)
  myHouses: House[];

  @Column({ enum: USER_ROLE })
  role: USER_ROLE;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
