import mysql from "mysql2/promise";
import { AppointmentClRepository } from "../domain/appointment-cl.repository";
import { AppointmentClEvent } from "../domain/appointment-cl.event";

export class MysqlAppointmentClRepository implements AppointmentClRepository {
  private config = {
    host: process.env.MYSQL_CL_HOST!,
    user: process.env.MYSQL_CL_USER!,
    password: process.env.MYSQL_CL_PASS!,
    database: process.env.MYSQL_CL_DB!,
  };

  async save(data: AppointmentClEvent): Promise<void> {
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
