import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import helmet from "helmet";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const config = new DocumentBuilder()
  .setTitle('Training App api')
  .setVersion('1.0')
  .addBearerAuth(undefined, 'defaultBearerAuth')
  .addTag('training')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
