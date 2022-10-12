import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  global.rootPath = path.resolve(__dirname);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * Strip away all none-object existing properties
       */
      whitelist: true,
      /***
       * Transform input objects to their corresponding DTO objects
       */
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  console.log(`Server Started at : ${port}`);
  await app.listen(port);
}
bootstrap();
