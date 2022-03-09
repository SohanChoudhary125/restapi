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
} from '@nestjs/common';
import { PostService } from './post.service';
import { getpostFilter, updatingPost } from './dto/getpost.dto';
import { addPost } from './dto/addpost.dto';

@Controller('post')
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
  async addpost(@Body() addingpost: addPost) {
    return await this.postservice.addpost(addingpost);
  }

  @Patch('/:id')
  async updatepost(
    @Param('id') id: string,
    @Body() updatingpost: updatingPost,
  ) {
    return await this.postservice.updatepost(id, updatingpost);
  }

  @Delete('/:id')
  async deleteuser(@Param('id') id: string) {
    return await this.postservice.deleteuser(id);
  }
}
