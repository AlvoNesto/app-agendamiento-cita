import { SNS } from 'aws-sdk';
import { Appointment } from '../domain/appointment.entity';
import { RecievedPublisher } from "../domain/recieved.publisher";

export class SnsRecievedPublisher implements RecievedPublisher {
  private snsClient = new SNS();
  private topicArn = process.env.SNS_TOPIC!;

  async publish(appointment: Appointment): Promise<void> {
    await this.snsClient.publish({
      TopicArn: this.topicArn,
      Message: JSON.stringify(appointment),
      MessageAttributes: {
        countryISO: { DataType: 'String', StringValue: appointment.countryISO },
      },
    }).promise();
  }
}
