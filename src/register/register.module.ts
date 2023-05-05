import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [RegisterController],
  imports: [TypeOrmModule.forFeature([UserEntity]), UserModule],
})
export class RegisterModule {}
