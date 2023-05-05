import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import helmet from 'helmet';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  // MicroserviceTCP
  // app.connectMicroservice<MicroserviceOptions>({
  //   inheritAppConfig: true,
  //   transport: Transport.TCP,
  //   options: {
  //     retryAttempts: 5,
  //     retryDelay: 3000,
  //   },
  // });

  // MicroserviceMQTT
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      host: 'localhost',
      port: 3001,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ các thuộc tính không được khai báo trong DTO
    }),
  );
  app.use(
    helmet({
      crossOriginResourcePolicy: false, // cho phép truy cập từ các domain khác
    }),
  );
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  //app.setGlobalPrefix('api');// them vao de tao ra duong dan /api/....
  const config = new DocumentBuilder()
    .setTitle('NestJS Swagger')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
