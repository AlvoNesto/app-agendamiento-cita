import { MysqlAppointmentClRepository } from "../infrastructure/mysql-appointment-cl.repository";
import { EventBridgeConfirmationPublisher } from "../../common/infrastructure/eventbridge-confirmation.publisher";

export class AppointmentClService {
  constructor(
    private repository: MysqlAppointmentClRepository,
    private publisher: EventBridgeConfirmationPublisher
  ) {}

  async processAppointment(data: any) {
    // await this.repository.save(data);
    await this.publisher.publish(data);
  }
}
