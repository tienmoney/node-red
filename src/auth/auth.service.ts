import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  // validate user
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUser(email); // check if user exists
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }
  // login user
  async login(user: any) {
    const payload = { email: user.email, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
      user: user.name,
      id: user.id,
    };
  }
}
