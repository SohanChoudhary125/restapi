import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://user123:user123@restapi.5gh7f.mongodb.net/nestjs-restapi?retryWrites=true&w=majority',
    ),
    TaskModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
