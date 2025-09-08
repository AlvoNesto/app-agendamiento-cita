import { AppointmentPeEvent } from "./appointment-pe.event";

export interface AppointmentPeRepository {
  save(data: AppointmentPeEvent): Promise<void>;
}
