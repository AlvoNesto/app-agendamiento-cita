import { Appointment } from './appointment.entity';

export interface AppointmentRepository {
  save(a: Appointment): Promise<void>;
  findByInsuredId(insuredId: string): Promise<any[] | undefined>;
  updateStatus(insuredId: string, scheduleId: number, status: string): Promise<void>;
}
