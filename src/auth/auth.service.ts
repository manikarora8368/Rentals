import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.find(email);
    if (user) {
      const match = await bcrypt.compare(pass, user.password);
      if (match) {
        const { password, ...result } = user;
        return result;
      } else
        throw new HttpException(
          'Email and password does not match',
          HttpStatus.UNAUTHORIZED,
        );
    } else
      throw new HttpException('Email does not exist', HttpStatus.UNAUTHORIZED);
  }
  async signup(User: CreateUserDto) {
    const check = await this.userRepo.findOne({ email: User.email });
    if (!check) {
      const newUser = this.userRepo.create({
        name: User.name.trim(),
        email: User.email.toLowerCase().trim(),
        password: bcrypt.hashSync(User.password, 10),
        role: 'user',
      });
      return this.userRepo.save(newUser);
    } else {
      throw new HttpException('Email not available', HttpStatus.CONFLICT);
    }
  }
  async login(user: any) {
    const payload = { id: user.id, sub: user.userId };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
  find(email: string): Promise<User> {
    return this.userRepo.findOne({ email: email });
  }
  findById(id: number): Promise<User> {
    return this.userRepo.findOne({ id: id });
  }
}
