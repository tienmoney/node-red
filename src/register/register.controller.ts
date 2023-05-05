import { Controller, Post, Body, Res } from '@nestjs/common';
import { CreateDto } from 'src/auth/dto/createDto';
import { UserService } from 'src/user/user.service';

@Controller('register')
export class RegisterController {
  constructor(private userService: UserService) {}
  @Post()
  async registerUser(@Body() registerDto: CreateDto, @Res() res) {
    const regUser = await this.userService.createUsers(registerDto);
    console.log(regUser);
    if (regUser === 'User already exists') {
      return res.status(409).json({
        status: 409,
        message: 'User already exists',
      });
    } else if (regUser === 'Passwords do not match') {
      return res.status(409).json({
        status: 409,
        message: 'Passwords do not match',
      });
    } else {
      return res.status(201).json({
        message: 'User created successfully',
        user: regUser,
      });
    }
  }
}
