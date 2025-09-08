import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { ConfirmationPublisher } from "../domain/confirmation.publisher";
import { AppointmentEvent } from "../domain/appointment.event";

export class EventBridgeConfirmationPublisher implements ConfirmationPublisher<AppointmentEvent> {
  private eb: EventBridgeClient;
  private busName: string;

  constructor() {
    this.eb = new EventBridgeClient({});
    this.busName = process.env.EVENT_BUS!;
  }

  async publish(event: AppointmentEvent): Promise<void> {
    const command = new PutEventsCommand({
      Entries: [
        {
          Source: `appointment.${event.countryISO.toLowerCase()}`,
          DetailType: "AppointmentCompleted",
          Detail: JSON.stringify(event),
          EventBusName: this.busName,
        },
      ],
    });

    await this.eb.send(command);
  }
}
