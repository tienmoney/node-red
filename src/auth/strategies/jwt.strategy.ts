/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../auth.constant';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStragety extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) { // inject userService
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {  // payload is the object we passed in when we created the token
    const  existsUser = await this.userService.findUser(payload.email); // check if user exists
    if (!existsUser) {
      throw new UnauthorizedException();
    }
    return { email: payload.email };
  }
}
