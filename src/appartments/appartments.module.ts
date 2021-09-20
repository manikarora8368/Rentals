import { Module } from '@nestjs/common';
import { AppartmentsService } from './appartments.service';
import { AppartmentsController } from './appartments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appartment } from './entities/appartment.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appartment,User]) , UsersModule],
  controllers: [AppartmentsController],
  providers: [AppartmentsService]
})
export class AppartmentsModule {}
