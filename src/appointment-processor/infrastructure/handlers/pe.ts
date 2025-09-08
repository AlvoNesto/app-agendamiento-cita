import { AppointmentClService } from "../../application/appointment-processor.service";
import { MysqlAppointmentRepository } from "../mysql-appointment.repository";
import { EventBridgeConfirmationPublisher } from "../eventbridge-confirmation.publisher";

const service = new AppointmentClService(new MysqlAppointmentRepository(), new EventBridgeConfirmationPublisher());

export const main = async (event: any) => {
  for (const record of event.Records) {
    const raw = JSON.parse(record.body);
    const payload = raw.Message ? JSON.parse(raw.Message) : raw;
    await service.processAppointment(payload);
  }
};
