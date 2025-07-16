import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Toonflix API')
    .setDescription('The API for the Toonflix application')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  SwaggerModule.setup('api', app, () =>
    SwaggerModule.createDocument(app, config),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(console.error);
