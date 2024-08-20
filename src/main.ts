import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { validationOptions } from './utils/validation-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: "*",
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "Access-Control-Allow-Origin"
    ],
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    exposedHeaders: "Authorization"
  })
  
  /**
   * enforce global validation rules for all incoming client payloads
   */
  app.useGlobalPipes(new ValidationPipe(validationOptions));


  // const configService = app.get(ConfigService);

  // app.setGlobalPrefix(
  //   configService.getOrThrow("app.apiPrefix", { infer: true })
  // );

  await app.listen(3000);
}
bootstrap();
