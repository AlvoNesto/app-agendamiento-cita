import { EventBridge } from "aws-sdk";
import { ConfirmationPublisher } from "../domain/confirmation.publisher";
import { AppointmentEvent } from "../domain/appointment.event";

export class EventBridgeConfirmationPublisher implements ConfirmationPublisher<AppointmentEvent> {
  private eb = new EventBridge();
  private busName = process.env.EVENT_BUS!;

  async publish(event: AppointmentEvent): Promise<void> {
    await this.eb.putEvents({
      Entries: [
        {
          Source: `appointment.${event.countryISO.toLowerCase()}`,
          DetailType: "AppointmentCompleted",
          Detail: JSON.stringify(event),
          EventBusName: this.busName,
        },
      ],
    }).promise();
  }
}
