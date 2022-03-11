import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('User') private UserData: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'dwofnu39gnvoe',
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;
    const user = await this.UserData.findOne({ email });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
