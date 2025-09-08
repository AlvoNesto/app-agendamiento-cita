import { DynamoDBClient, PutItemCommand, QueryCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { Appointment } from "../domain/appointment.entity";
import { AppointmentRepository } from "../domain/appointment.repository";

export class DynamoDBAppointmentRepository implements AppointmentRepository {
  private client = new DynamoDBClient({});
  private tableName = process.env.APPOINTMENT_TABLE!;

  async save(appointment: Appointment) {
    await this.client.send(
      new PutItemCommand({
        TableName: this.tableName,
        Item: marshall(appointment),
      })
    );
  }

  async findByInsuredId(insuredId: string) {
    const res = await this.client.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: "insuredId = :i",
        ExpressionAttributeValues: { ":i": { S: insuredId } },
      })
    );
    return res.Items?.map((i) => unmarshall(i));
  }

  async updateStatus(insuredId: string, scheduleId: number, status: string) {
    await this.client.send(
      new UpdateItemCommand({
        TableName: this.tableName,
        Key: marshall({ insuredId, scheduleId }),
        UpdateExpression: "set #s = :s",
        ExpressionAttributeNames: { "#s": "status" },
        ExpressionAttributeValues: marshall({ ":s": status }),
      })
    );
  }
}
