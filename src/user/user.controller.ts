import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { addUser } from './dto/adduser.dto';
import {
  getUserFilter,
  updatingUser,
  validUser,
} from './dto/getuserfilter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  @Get()
  async getuser(@Query(ValidationPipe) filleruser: getUserFilter) {
    if (Object.keys(filleruser).length)
      return await this.userservice.getbyfilter(filleruser);

    return await this.userservice.getallUser();
  }

  @Get('/:id')
  async getuserbyid(@Param('id') id: string) {
    return await this.userservice.getbyID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async adduser(@Body() addinguser: addUser) {
    return await this.userservice.addUser(addinguser);
  }

  @Post('/signin')
  async siginguser(@Body() validuser: validUser) {
    return await this.userservice.validinguser(validuser);
  }

  @Patch('/:id')
  async updateuser(
    @Param('id') id: string,
    @Body() updatinguser: updatingUser,
  ) {
    return await this.userservice.updateuser(id, updatinguser);
  }

  @Delete('/:id')
  async deleteuser(@Param('id') id: string) {
    return await this.userservice.deleteuser(id);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
