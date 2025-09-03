// src/appointment_cl/appointment-cl.module.ts
import { Module } from '@nestjs/common';
import { AppointmentClService } from './appointment-cl.service';
import { RdsService } from '../common/rds.service';
import { SnsService } from '../common/sns.service';

@Module({
  imports: [],
  providers: [AppointmentClService, RdsService, SnsService],
  exports: [AppointmentClService],
})
export class AppointmentClModule {}
