import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import config from '../../ormconfig';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]) , UsersModule, PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '7d'}
  })
],
  providers: [AuthService,LocalStrategy ,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
