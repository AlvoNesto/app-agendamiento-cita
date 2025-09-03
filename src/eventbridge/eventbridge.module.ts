// src/eventbridge/eventbridge.module.ts
import { Module } from '@nestjs/common';
import { EventBridgeService } from './eventbridge.service';
import { AppointmentModule } from '../appointment/appointment.module';
import { AppointmentService } from '../appointment/appointment.service';

@Module({
  imports: [AppointmentModule],
  providers: [EventBridgeService],
})
export class EventbridgeModule {}
