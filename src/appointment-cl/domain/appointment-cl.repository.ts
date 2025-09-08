import { AppointmentClEvent } from "./appointment-cl.event";

export interface AppointmentClRepository {
  save(data: AppointmentClEvent): Promise<void>;
}
