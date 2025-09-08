import { Context } from 'aws-lambda';
import { bootstrap } from './bootstrap/http';
import { getContext } from './bootstrap/sqs';
import { AppointmentService } from '../application/appointment.service';

export const main = async (event: any, context: Context) => {
  // HTTP handler
  if (event.requestContext && event.requestContext.http) {
    const httpHandler = await bootstrap();
    return httpHandler(event, context);
  }

  // SQS handler
  if (event.Records && event.Records[0].eventSource === 'aws:sqs') {
    const appContext = await getContext();
    const service = appContext.get(AppointmentService);
    for (const rec of event.Records) {
      const raw = JSON.parse(rec.body);
      const payload = raw.Message ? JSON.parse(raw.Message) : raw;
      const detail = payload.detail || {};
      await service.completeAppointment(detail.insuredId, detail.scheduleId);
    }
    return { statusCode: 200, body: 'SQS processed' };
  }

  return { statusCode: 400, body: 'Unsupported event' };
};
