import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from '../application/appointment.service';
import { DynamoDBAppointmentRepository } from './dynamodb-appointment.repository';
import { SnsRecievedPublisher } from './sns-recieved.publisher';
import { AppointmentRepository } from '../domain/appointment.repository';
import { RecievedPublisher } from '../domain/recieved.publisher';

@Module({
  controllers: [AppointmentController],
  providers: [
    { provide: 'AppointmentRepository', useClass: DynamoDBAppointmentRepository },
    { provide: 'EventPublisher', useClass: SnsRecievedPublisher },
    {
      provide: AppointmentService,
      useFactory: (repo: AppointmentRepository, publisher: RecievedPublisher) =>
        new AppointmentService(repo as any, publisher as any),
      inject: ['AppointmentRepository','EventPublisher']
    }
  ],
})
export class AppointmentModule {}
