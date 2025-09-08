import { Injectable } from '@nestjs/common';
import { Appointment } from '../domain/appointment.entity';
import { DynamoDBAppointmentRepository } from '../infrastructure/dynamodb-appointment.repository';
import { SnsRecievedPublisher } from '../infrastructure/sns-recieved.publisher';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly repository: DynamoDBAppointmentRepository,
    private readonly publisher: SnsRecievedPublisher,
  ) {}

  async createAppointment(insuredId: string, scheduleId: number, countryISO: string) {
    const appointment = new Appointment(insuredId, scheduleId, countryISO, 'pending');
    await this.repository.save(appointment);
    await this.publisher.publish(appointment);
    return { message: "Appointment request received", appointment };
  }

  async listAppointments(insuredId: string) {
    return await this.repository.findByInsuredId(insuredId);
  }

  async completeAppointment(insuredId: string, scheduleId: number) {
    await this.repository.updateStatus(insuredId, scheduleId, "completed");
  }
}
