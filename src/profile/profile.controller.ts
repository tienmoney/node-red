import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProfile() {
    return {
      message: 'You made it to the secure route',
      access_token: 'JWT access token',
    };
  }
}
