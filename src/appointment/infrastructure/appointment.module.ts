import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from '../application/appointment.service';
import { DynamoDBRepository } from './dynamodb.repository';
import { SnsPublisher } from './sns.publisher';
import { AppointmentRepository } from '../domain/appointment.repository';
import { EventPublisher } from '../domain/event.publisher';

@Module({
  controllers: [AppointmentController],
  providers: [
    { provide: 'AppointmentRepository', useClass: DynamoDBRepository },
    { provide: 'EventPublisher', useClass: SnsPublisher },
    {
      provide: AppointmentService,
      useFactory: (repo: AppointmentRepository, publisher: EventPublisher) =>
        new AppointmentService(repo as any, publisher as any),
      inject: ['AppointmentRepository','EventPublisher']
    }
  ],
})
export class AppointmentModule {}
