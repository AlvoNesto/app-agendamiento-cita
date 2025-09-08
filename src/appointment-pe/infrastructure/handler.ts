import { AppointmentPeService } from "../application/appointment-pe.service";
import { MysqlAppointmentPeRepository } from "./mysql-appointment-pe.repository";
import { EventBridgeConfirmationPublisher } from "../../common/infrastructure/eventbridge-confirmation.publisher";

const service = new AppointmentPeService(new MysqlAppointmentPeRepository(), new EventBridgeConfirmationPublisher());

export const main = async (event: any) => {
  for (const record of event.Records) {
    const raw = JSON.parse(record.body);
    const payload = raw.Message ? JSON.parse(raw.Message) : raw;
    await service.processAppointment(payload);
  }
};
