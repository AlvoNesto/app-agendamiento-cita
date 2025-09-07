import { AppointmentEvent } from "./appointment.event";

export interface AppointmentRepository {
  save(data: AppointmentEvent): Promise<void>;
}
