import { SQSEvent } from 'aws-lambda';
import { EventbridgeModule } from './eventbridge.module';
import { EventBridgeService } from './eventbridge.service';
import { createWorker } from '../common/lambda-worker';

let appCtx: any = null;

export const main = async (event: SQSEvent) => {
  const appCtx = await createWorker(EventbridgeModule);
  const svc = appCtx.get(EventBridgeService);

  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body);
      // Si viene de SQS con EventBridge Target, el cuerpo puede ser el evento.
      // body puede tener detail o venir directamente como { appointmentId, status }
      const payload = body.detail ? body.detail : (body.Message ? JSON.parse(body.Message) : body);
      await svc.handleConfirmation(payload);
    } catch (err) {
      console.error('Error handling confirmation', err);
      throw err;
    }
  }

  return { ok: true };
};
