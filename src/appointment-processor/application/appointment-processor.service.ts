import { MysqlAppointmentRepository } from "../infrastructure/mysql-appointment.repository";
import { EventBridgePublisher } from "../infrastructure/eventbridge.publisher";

export class AppointmentClService {
  constructor(
    private repository: MysqlAppointmentRepository,
    private publisher: EventBridgePublisher
  ) {}

  async processAppointment(data: any) {
    console.log(data);
    await this.repository.save(data);
    await this.publisher.publish(data);
  }
}
