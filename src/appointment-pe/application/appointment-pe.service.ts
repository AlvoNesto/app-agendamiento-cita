import { MysqlAppointmentPeRepository } from "../infrastructure/mysql-appointment-pe.repository";
import { EventBridgeConfirmationPublisher } from "../../common/infrastructure/eventbridge-confirmation.publisher";

export class AppointmentPeService {
  constructor(
    private repository: MysqlAppointmentPeRepository,
    private publisher: EventBridgeConfirmationPublisher
  ) {}

  async processAppointment(data: any) {
    await this.repository.save(data);
    await this.publisher.publish(data);
  }
}
