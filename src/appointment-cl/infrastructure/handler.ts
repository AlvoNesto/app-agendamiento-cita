import { AppointmentClService } from "../application/appointment-cl.service";
import { MysqlAppointmentClRepository } from "./mysql-appointment-cl.repository";
import { EventBridgeConfirmationPublisher } from "../../common/infrastructure/eventbridge-confirmation.publisher";

const service = new AppointmentClService(new MysqlAppointmentClRepository(), new EventBridgeConfirmationPublisher());

export const main = async (event: any) => {
  for (const record of event.Records) {
    const raw = JSON.parse(record.body);
    const payload = raw.Message ? JSON.parse(raw.Message) : raw;
    await service.processAppointment(payload);
  }
};
