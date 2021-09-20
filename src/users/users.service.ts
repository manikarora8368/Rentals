import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  findAll() {
    return this.userRepo.find();
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ email: email });
    if (!user) {
      this.exception();
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, User) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      this.exception();
    }
    let check = await this.userRepo.findOne({
      email: updateUserDto.email.toLowerCase().trim(),
    });
    console.log(user, updateUserDto);
    const enumRole = ['user', 'realtor', 'admin'];
    if (!enumRole.includes(updateUserDto.role)) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Please specify a valid role',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (!check || check.email == user.email) {
      user.name = updateUserDto.name.trim();
      user.password = updateUserDto.password;
      user.email = updateUserDto.email.toLowerCase().trim();
      if (updateUserDto.role !== user.role && User.role !== 'admin') {
        throw new HttpException(
          "You don't have the permissions to perform the task",
          HttpStatus.FORBIDDEN,
        );
      } else {
        user.role = updateUserDto.role;
      }
      return this.userRepo.save(user);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Email already taken',
        },
        HttpStatus.CONFLICT,
      );
    }
  }
  async changeRole(body) {
    const user = await this.userRepo.findOne({ email: body.email });
    const enumRole = ['user', 'realtor', 'admin'];
    if (!enumRole.includes(body.role)) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Please specify a valid role',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (!user) {
      this.exception();
    }
    if (body.role) {
      user.role = body.role;
    }
    return this.userRepo.save(user);
  }
  async remove(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      this.exception();
    }
    return this.userRepo.remove(user);
  }
  exception() {
    throw new HttpException(
      'User not found With the given ID',
      HttpStatus.NOT_FOUND,
    );
  }
}
