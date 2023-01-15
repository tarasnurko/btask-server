import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    //   {
    //   cors: {
    //     origin: 'https://btask-client.vercel.app',
    //     credentials: true,
    //     methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    //     preflightContinue: false,
    //   },
    // }
  );

  // app.enableCors({
  // origin: ['https://btask-client.vercel.app', '*'],
  // credentials: true,
  // methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  // preflightContinue: false,
  // });

  app.enableCors();

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
