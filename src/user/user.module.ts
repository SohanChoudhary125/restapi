import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserData } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserData }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
