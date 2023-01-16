import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'https://btask-client.vercel.app',
      methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      optionsSuccessStatus: 200,
      credentials: true,
      preflightContinue: true,
    },
  });

  app.use(cookieParser());

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      return res.status(200).json({});
    }
    next();
  });

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
