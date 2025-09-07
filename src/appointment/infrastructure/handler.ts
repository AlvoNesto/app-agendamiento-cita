import { Context } from 'aws-lambda';
import { bootstrap } from './bootstrap/http';
import { getWorkerContext } from './bootstrap/worker';
import { AppointmentService } from '../application/appointment.service';

let cachedNestHandler: any;

export const main = async (event: any, context: Context) => {
  // HTTP handler
  if (event.requestContext && event.requestContext.http) {
    if (!cachedNestHandler) cachedNestHandler = await bootstrap();
    return cachedNestHandler(event, context);
  }

  // SQS handler
  if (event.Records && event.Records[0].eventSource === 'aws:sqs') {
    const appCtx = await getWorkerContext();
    const svc = appCtx.get(AppointmentService);
    for (const rec of event.Records) {
      const raw = JSON.parse(rec.body);
      const payload = raw.Message ? JSON.parse(raw.Message) : raw;
      await svc.completeAppointment(payload.insuredId, payload.scheduleId);
    }
    return { statusCode: 200, body: 'SQS processed' };
  }

  return { statusCode: 400, body: 'Unsupported event' };
};
