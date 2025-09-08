import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from '../application/appointment.service';
import { DynamoDBAppointmentRepository } from './dynamodb-appointment.repository';
import { SnsRecievedPublisher } from './sns-recieved.publisher';

@Module({
  controllers: [AppointmentController],
  providers: [
    DynamoDBAppointmentRepository,
    SnsRecievedPublisher,
    AppointmentService,
  ],
})
export class AppointmentModule {}
