import { createHandler } from '../common/lambda-http';
import { AppointmentModule } from './appointment.module';

export const main = createHandler(AppointmentModule);
