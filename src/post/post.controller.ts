import {
  Controller,
  Get,
  Param,
  Query,
  ValidationPipe,
  Post,
  UsePipes,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { getpostFilter, updatingPost } from './dto/getpost.dto';
import { addPost } from './dto/addpost.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from './../user/user.model';

@Controller('post')
@UseGuards(AuthGuard())
export class PostController {
  constructor(private postservice: PostService) {}

  @Get()
  async getuser(@Query(ValidationPipe) fillerpost: getpostFilter) {
    if (Object.keys(fillerpost).length)
      return await this.postservice.getbyfilter(fillerpost);

    return await this.postservice.getallPost();
  }

  @Get('/:id')
  async getuserbyid(@Param('id') id: string) {
    return await this.postservice.getbyID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async addpost(@Body() addingpost: addPost, @GetUser() user: User) {
    return await this.postservice.addpost(addingpost, user);
  }

  @Patch('/:id')
  async updatepost(
    @Param('id') id: string,
    @Body() updatingpost: updatingPost,
    @GetUser() user: User,
  ) {
    return await this.postservice.updatepost(id, updatingpost, user);
  }

  @Delete('/:id')
  async deleteuser(@Param('id') id: string, @GetUser() user: User) {
    return await this.postservice.deleteuser(id, user);
  }
}
