import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RegisterModule } from './register/register.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { TodoModule } from './todo/todo.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StaticController } from './static/static.controller';
import { StaticModule } from './static/static.module';
import { MathModule } from './math/math.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RegisterModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestjs',
      entities: [
        UserEntity,
        'dist/**/*.entity{.ts,.js}',
        'src/**/*.entity{.ts,.js}',
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProfileModule,
    TodoModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads_dist'),
    }),
    StaticModule,
    MathModule,
  ],
  controllers: [AppController, ProfileController, StaticController],
  providers: [],
})
export class AppModule {}
