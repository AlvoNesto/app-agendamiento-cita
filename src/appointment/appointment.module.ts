// src/appointment/appointment.module.ts
import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { DynamoDbService } from '../common/dynamodb.service';
import { SnsService } from '../common/sns.service';

@Module({
  imports: [],
  controllers: [AppointmentController],
  providers: [AppointmentService, DynamoDbService, SnsService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
