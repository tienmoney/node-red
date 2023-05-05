/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // implements PassportStrategy(Strategy)
  constructor(private moduleRef: ModuleRef, private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string): Promise<any> {
    // const auth= this.moduleRef.get(AuthService, { strict: false }); // get the instance of AuthService
    const user = await this.authService.validateUser(email, password); // call the validateUser method
    console.log('validate:'  + user);
    if (!user) {
        throw new UnauthorizedException();
    }
    return user;
  }
}
