// src/common/sns.service.ts
import { Injectable } from '@nestjs/common';
import { SNSClient, PublishCommand, PublishCommandInput } from '@aws-sdk/client-sns';

@Injectable()
export class SnsService {
  private client = new SNSClient({});
  private topicArn = process.env.APPOINTMENTS_TOPIC!;

  /**
   * publish: publica un mensaje en el topic con atributos (ej. countryISO)
   */
  async publish(message: Record<string, any>, attrs?: Record<string, string>) {
    const input: PublishCommandInput = {
      TopicArn: this.topicArn,
      Message: JSON.stringify(message),
      MessageAttributes: {},
    };

    if (attrs) {
      for (const k of Object.keys(attrs)) {
        input.MessageAttributes![k] = { DataType: 'String', StringValue: attrs[k] };
      }
    }

    await this.client.send(new PublishCommand(input));
  }
}
