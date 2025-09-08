import mysql from "mysql2/promise";
import { AppointmentPeRepository } from "../domain/appointment-pe.repository";
import { AppointmentPeEvent } from "../domain/appointment-pe.event";

export class MysqlAppointmentPeRepository implements AppointmentPeRepository {
  private config = {
    host: process.env.MYSQL_PE_HOST!,
    user: process.env.MYSQL_PE_USER!,
    password: process.env.MYSQL_PE_PASS!,
    database: process.env.MYSQL_PE_DB!,
  };

  async save(data: AppointmentPeEvent): Promise<void> {
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
