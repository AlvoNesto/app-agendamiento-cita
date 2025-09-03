// src/appointment_cl/main.ts
import { SQSEvent } from 'aws-lambda';
import { AppointmentClModule } from './appointment-cl.module';
import { AppointmentClService } from './appointment-cl.service';
import { createWorker } from '../common/lambda-worker';

let appCtx: any = null;

export const main = async (event: SQSEvent) => {
  const appCtx = await createWorker(AppointmentClModule);
  const svc = appCtx.get(AppointmentClService);

  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body);
      const payload = body.Message ? JSON.parse(body.Message) : body;
      await svc.processAppointment(payload);
    } catch (err) {
      console.error('Error processing record', err);
      throw err;
    }
  }

  return { ok: true };
};
