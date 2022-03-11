import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { addUser } from './dto/adduser.dto';
import {
  getUserFilter,
  updatingUser,
  validUser,
} from './dto/getuserfilter.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private UserData: Model<User>,
    private jwtservice: JwtService,
  ) {}

  async getallUser() {
    const user = await this.UserData.find().exec();
    return user.map((use) => ({
      id: use.id,
      name: use.name,
      email: use.email,
      date: use.date,
    }));
  }

  async getbyfilter(filleruser: getUserFilter) {
    const { search } = filleruser;

    let users = await this.getallUser();

    if (search) {
      users = users.filter((use) => use.name.includes(search));
    }

    return users;
  }

  async getbyID(id: string) {
    let user;
    try {
      user = await this.UserData.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`ID ${id} is not found`);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      date: user.date,
    };
  }

  async addUser(addinguser: addUser) {
    const { name, email, password } = addinguser;

    const salting = await bcrypt.genSalt();

    const user = new this.UserData({
      name,
      email,
      salt: salting,
      pass: password,
      password: await this.hashpassword(password, salting),
    });

    const exist = await this.UserData.findOne({ email: user.email });

    if (exist) throw new BadRequestException(`Email is already taken`);

    const use = await user.save();

    return {
      id: use.id,
      name: use.name,
      email: use.email,
      date: use.date,
    };
  }

  async updateuser(id: string, updatinguser: updatingUser) {
    const user = await this.finduser(id);

    const { name, email, password } = updatinguser;
    const salting = await bcrypt.genSalt();

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      user.pass = password;

      user.salt = salting;
      user.password = await this.hashpassword(password, salting);
    }
    await user.save();
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.pass,
      date: user.date,
    };
  }

  private async finduser(id: string) {
    let user;
    try {
      user = await this.UserData.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`ID ${id} is not found`);
    }

    return user;
  }

  private async hashpassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  async deleteuser(id: string) {
    await this.finduser(id);
    const result = await this.UserData.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0)
      throw new NotFoundException(`ID ${id} is not found`);
    return 'Deletion Successful';
  }

  async validinguser(validuser: validUser) {
    const { email, password } = validuser;
    const user = await this.UserData.findOne({ email }).exec();
    if (user) {
      if (!(user.password === (await this.hashpassword(password, user.salt)))) {
        throw new UnauthorizedException('Invalid Password');
      }
      const email = user.email;
      const token = await this.jwtservice.sign({ email });
      return { accesstoken: token };
    }
    throw new UnauthorizedException('Invalid User');
  }
}
