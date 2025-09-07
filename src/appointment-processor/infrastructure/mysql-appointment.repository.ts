import mysql from "mysql2/promise";
import { AppointmentRepository } from "../domain/appointment.repository";
import { AppointmentEvent } from "../domain/appointment.event";

export class MysqlAppointmentRepository implements AppointmentRepository {
  private config = {
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASS!,
    database: process.env.MYSQL_DB!,
  };

  async save(data: AppointmentEvent): Promise<void> {
    const connection = await mysql.createConnection(this.config);
    try {
      await connection.execute(
        "INSERT INTO appointments (insuredId, scheduleId, countryISO, status) VALUES (?, ?, ?, ?)",
        [data.insuredId, data.scheduleId, data.countryISO, data.status]
      );
    } finally {
      await connection.end();
    }
  }
}
