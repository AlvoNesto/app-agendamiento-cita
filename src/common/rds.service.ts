// src/common/rds.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { RDSDataClient, ExecuteStatementCommand } from '@aws-sdk/client-rds-data';

/**
 * Servicio simplificado que usa RDS Data API.
 * Variables necesarias en entorno:
 *  - RDS_RESOURCE_ARN
 *  - RDS_SECRET_ARN
 *  - DB_NAME
 */
@Injectable()
export class RdsService {
  private client = new RDSDataClient({});
  private resourceArn = process.env.RDS_RESOURCE_ARN!;
  private secretArn = process.env.RDS_SECRET_ARN!;
  private database = process.env.DB_NAME!;
  private logger = new Logger(RdsService.name);

  async insertAppointment(table: string, payload: Record<string, any>) {
    // Ejemplo simple: se asume que la tabla existe y las columnas coinciden.
    const cols = Object.keys(payload);
    const values = cols.map((c, i) => `:v${i}`).join(', ');
    const colList = cols.join(', ');
    const sql = `INSERT INTO ${table} (${colList}) VALUES (${values})`;
    const parameters = cols.map((c, i) => ({ name: `v${i}`, value: { stringValue: String(payload[c]) } }));

    try {
      await this.client.send(new ExecuteStatementCommand({
        resourceArn: this.resourceArn,
        secretArn: this.secretArn,
        database: this.database,
        sql,
        parameters,
      }));
    } catch (err) {
      this.logger.error('Error inserting appointment', (err as Error).message);
      throw err;
    }
  }
}
