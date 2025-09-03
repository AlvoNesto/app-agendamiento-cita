// src/appointment_pe/appointment-pe.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { RdsService } from '../common/rds.service';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

@Injectable()
export class AppointmentPeService {
  private logger = new Logger(AppointmentPeService.name);
  private eb = new EventBridgeClient({});
  private eventBusName = process.env.APPOINTMENT_BUS_NAME ?? 'appointments-bus';
  private rdsTable = process.env.RDS_APPOINTMENTS_TABLE ?? 'appointments';

  constructor(private readonly rds: RdsService) {}

  /**
   * Procesa un appointment (viene del SQS que SNS enrutó).
   * Guarda en RDS (MySQL) y emite conformidad a EventBridge.
   */
  async processAppointment(payload: any) {
    this.logger.log('Processing appointment (PE): ' + JSON.stringify(payload));
    // 1) Guardar en MySQL (RDS via Data API)
    await this.rds.insertAppointment(this.rdsTable, {
      appointmentId: payload.appointmentId,
      insuredId: payload.insuredId,
      countryISO: payload.countryISO,
      metadata: payload.metadata ?? '',
      createdAt: payload.createdAt ?? new Date().toISOString(),
    });

    // 2) Emitir evento de confirmación a EventBridge
    const entry = {
      Source: 'appointment.confirmed',
      EventBusName: this.eventBusName,
      DetailType: 'APPOINTMENT_CONFIRMED',
      Detail: JSON.stringify({ appointmentId: payload.appointmentId, status: 'confirmed', region: 'PE' }),
    };

    await this.eb.send(new PutEventsCommand({ Entries: [entry] }));
    this.logger.log(`Appointment ${payload.appointmentId} processed and confirmation sent to EventBridge`);
  }
}
