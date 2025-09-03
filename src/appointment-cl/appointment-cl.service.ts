// src/appointment_cl/appointment-cl.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { RdsService } from '../common/rds.service';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

@Injectable()
export class AppointmentClService {
  private logger = new Logger(AppointmentClService.name);
  private eb = new EventBridgeClient({});
  private eventBusName = process.env.APPOINTMENT_BUS_NAME ?? 'appointments-bus';
  private rdsTable = process.env.RDS_APPOINTMENTS_TABLE ?? 'appointments';

  constructor(private readonly rds: RdsService) {}

  async processAppointment(payload: any) {
    this.logger.log('Processing appointment (CL): ' + JSON.stringify(payload));
    await this.rds.insertAppointment(this.rdsTable, {
      appointmentId: payload.appointmentId,
      insuredId: payload.insuredId,
      countryISO: payload.countryISO,
      metadata: payload.metadata ?? '',
      createdAt: payload.createdAt ?? new Date().toISOString(),
    });

    const entry = {
      Source: 'appointment.confirmed',
      EventBusName: this.eventBusName,
      EventDetailType: 'APPOINTMENT_CONFIRMED', // note: EventBridge uses DetailType field
      DetailType: 'APPOINTMENT_CONFIRMED',
      Detail: JSON.stringify({ appointmentId: payload.appointmentId, status: 'confirmed', region: 'CL' }),
    };

    await this.eb.send(new PutEventsCommand({ Entries: [entry] }));
    this.logger.log(`Appointment ${payload.appointmentId} processed (CL) and confirmation sent`);
  }
}
