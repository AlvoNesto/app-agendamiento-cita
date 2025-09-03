// src/eventbridge/eventbridge.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { AppointmentService } from '../appointment/appointment.service';

@Injectable()
export class EventBridgeService {
  private logger = new Logger(EventBridgeService.name);

  constructor(private readonly appointmentService: AppointmentService) {}

  /**
   * procesa confirmaciones que vienen por SQS (desde EventBridge target)
   * payload expected: { appointmentId, status }
   */
  async handleConfirmation(payload: any) {
    this.logger.log('Handling confirmation: ' + JSON.stringify(payload));
    const appointmentId = payload.appointmentId;
    const status = payload.status ?? 'completed';
    if (!appointmentId) {
      this.logger.warn('Confirmation without appointmentId, skipping');
      return;
    }
    await this.appointmentService.updateStatus(appointmentId, status);
  }
}
