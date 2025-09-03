// src/appointment_pe/main.ts
import { SQSEvent } from 'aws-lambda';
import { AppointmentPeModule } from './appointment-pe.module';
import { AppointmentPeService } from './appointment-pe.service';
import { createWorker } from '../common/lambda-worker';

let appCtx: any = null;

export const main = async (event: SQSEvent) => {
  const appCtx = await createWorker(AppointmentPeModule);
  const svc = appCtx.get(AppointmentPeService);

  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body);
      // if the SQS receives SNS message, sometimes message is under Message field
      const payload = body.Message ? JSON.parse(body.Message) : body;
      await svc.processAppointment(payload);
    } catch (err) {
      console.error('Error processing record', err);
      // Dejar que Lambda gestione reintentos / DLQ
      throw err;
    }
  }
  return { ok: true, processed: event.Records.length };
};
