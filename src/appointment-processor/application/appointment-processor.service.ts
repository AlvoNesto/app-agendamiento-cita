import { MysqlAppointmentRepository } from "../infrastructure/mysql-appointment.repository";
import { EventBridgeConfirmationPublisher } from "../infrastructure/eventbridge-confirmation.publisher";

export class AppointmentClService {
  constructor(
    private repository: MysqlAppointmentRepository,
    private publisher: EventBridgeConfirmationPublisher
  ) {}

  async processAppointment(data: any) {
    console.log(data);
    // await this.repository.save(data);
    await this.publisher.publish(data);
  }
}
