// src/appointment_pe/appointment-pe.module.ts
import { Module } from '@nestjs/common';
import { AppointmentPeService } from './appointment-pe.service';
import { RdsService } from '../common/rds.service';
import { AppointmentModule } from '../appointment/appointment.module';
import { SnsService } from '../common/sns.service';

@Module({
  imports: [AppointmentModule],
  providers: [AppointmentPeService, RdsService, SnsService],
  exports: [AppointmentPeService],
})
export class AppointmentPeModule {}
