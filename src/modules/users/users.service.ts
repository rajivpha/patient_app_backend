import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'primary')
    private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, email } = createUserDto;

    const isDuplicate = await this.userRepo.findOne({
      where: { email },
    });
    if (isDuplicate) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    await this.userRepo.save({ ...createUserDto });
    return { email: email };
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    return user;
  }
  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email: email } });
    return user;
  }
  async update(id: string, userUpdate: any) {
    await this.userRepo.update({ id: id }, { ...userUpdate });
  }

  async authenticateUser({ email, password }: CreateUserDto) {
    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordCorrect = await bcrypt.compare(user.password, password);

    if (!isPasswordCorrect) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return { id: user.id, email: email };
  }
}
