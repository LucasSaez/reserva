import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //habilitar cors
  app.enableCors();

  //habilitamos los pipes globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  //prefijamos una ruta para los endpoints
  app.setGlobalPrefix('api');
  

  await app.listen(envs.port);
}
bootstrap();