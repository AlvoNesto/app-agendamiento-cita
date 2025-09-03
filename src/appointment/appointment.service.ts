// src/appointment/appointment.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { DynamoDbService } from '../common/dynamodb.service';
import { SnsService } from '../common/sns.service';

@Injectable()
export class AppointmentService {
  private logger = new Logger(AppointmentService.name);

  constructor(
    private readonly dynamo: DynamoDbService,
    private readonly sns: SnsService,
  ) {}

  /**
   * Crea el appointment (DynamoDB: pending) y publica en SNS con atributo countryISO.
   */
  async create(dto: CreateAppointmentDto) {
    // 1) Guardar en DynamoDB con estado pending
    const item = {
      appointmentId: dto.id,
      insuredId: dto.insuredId,
      status: 'pending',
      countryISO: dto.countryISO,
      metadata: dto.metadata ?? '',
      createdAt: new Date().toISOString(),
    };
    await this.dynamo.putItem(item);

    // 2) Publicar en SNS con atributo countryISO para filtrado
    await this.sns.publish(item, { countryISO: dto.countryISO });

    this.logger.log(`Appointment ${dto.id} stored (pending) and published (country=${dto.countryISO})`);
    return { ok: true, id: dto.id };
  }

  async findByInsured(insuredId: string) {
    const items = await this.dynamo.queryByInsured(insuredId);
    // se podrían unmarshallizar; aquí devolvemos tal cual
    return items;
  }

  async updateStatus(appointmentId: string, status: string) {
    await this.dynamo.updateStatus(appointmentId, status);
    this.logger.log(`Appointment ${appointmentId} updated to ${status}`);
  }
}
