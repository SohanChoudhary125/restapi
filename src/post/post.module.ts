import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostData } from './post.model';
import { UserModule } from './../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostData }]),
    UserModule,
  ],

  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
