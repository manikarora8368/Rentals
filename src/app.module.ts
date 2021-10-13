import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppartmentsModule } from './appartments/appartments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
// import { type } from 'os';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: ['dist/src/**/*.entity.js'],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    AuthModule,
    UsersModule,
    AppartmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
