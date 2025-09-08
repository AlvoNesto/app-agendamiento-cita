import { Injectable } from '@nestjs/common';
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { Appointment } from "../domain/appointment.entity";
import { RecievedPublisher } from "../domain/recieved.publisher";

@Injectable()
export class SnsRecievedPublisher implements RecievedPublisher {
  private snsClient: SNSClient;
  private topicArn: string;

  constructor() {
    this.snsClient = new SNSClient({});
    this.topicArn = process.env.SNS_TOPIC!;
  }

  async publish(appointment: Appointment): Promise<void> {
    const command = new PublishCommand({
      TopicArn: this.topicArn,
      Message: JSON.stringify(appointment),
      MessageAttributes: {
        countryISO: {
          DataType: "String",
          StringValue: appointment.countryISO,
        },
      },
    });

    await this.snsClient.send(command);
  }
}
