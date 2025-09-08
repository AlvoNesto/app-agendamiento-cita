import { NestFactory } from "@nestjs/core";
import { AppointmentModule } from "../appointment.module";
import serverlessExpress from "@vendia/serverless-express";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


let cached: any;

export async function bootstrap() {
  if (!cached) {
    const app = await NestFactory.create(AppointmentModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
    cached = serverlessExpress({ app: app.getHttpAdapter().getInstance() });
  }
  return cached;
}
