import { NestFactory } from '@nestjs/core';
import { AppointmentModule } from './appointment/infrastructure/appointment.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppointmentModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Appointments API')
    .setDescription('API para agendamiento')
    .setVersion('1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  writeFileSync('./swagger.json', JSON.stringify(doc, null, 2));

  await app.listen(3000);
}
bootstrap();