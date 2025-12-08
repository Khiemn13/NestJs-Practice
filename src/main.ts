import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import * as bodyParser from 'body-parser';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Serve static files from "public" folder
  app.use(express.static(join(__dirname, '..', 'public')));

  // Parse form data (application/x-www-form-urlencoded) and JSON
  app.use(bodyParser.urlencoded({ extended: true })); // for HTML forms
  app.use(bodyParser.json());                         // for JSON

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap(); 
