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
    
    const config = new DocumentBuilder()
      .setTitle('Appointments API')
      .setDescription('API para agendamiento')
      .setVersion('1.0')
      .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, doc);
    await app.init();
    cached = serverlessExpress({ app: app.getHttpAdapter().getInstance() });
  }
  return cached;
}
