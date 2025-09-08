import { DynamoDB } from "aws-sdk";
import { Appointment } from "../domain/appointment.entity";
import { AppointmentRepository } from "../domain/appointment.repository";

export class DynamoDBAppointmentRepository implements AppointmentRepository {
  private client = new DynamoDB.DocumentClient();
  private tableName = process.env.APPOINTMENT_TABLE!;

  async save(appointment: Appointment) {
    await this.client
      .put({
        TableName: this.tableName,
        Item: appointment,
      })
      .promise();
  }

  async findByInsuredId(insuredId: string) {
    const res = await this.client
      .query({
        TableName: this.tableName,
        KeyConditionExpression: "insuredId = :i",
        ExpressionAttributeValues: { ":i": insuredId },
      })
      .promise();
    return res.Items;
  }

  async updateStatus(insuredId: string, scheduleId: number, status: string) {
    await this.client
      .update({
        TableName: this.tableName,
        Key: { insuredId, scheduleId },
        UpdateExpression: "set #s = :s",
        ExpressionAttributeNames: { "#s": "status" },
        ExpressionAttributeValues: { ":s": status },
      })
      .promise();
  }
}
