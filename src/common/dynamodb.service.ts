// src/common/dynamodb.service.ts
import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
  QueryCommandInput,
} from '@aws-sdk/client-dynamodb';

@Injectable()
export class DynamoDbService {
  private client = new DynamoDBClient({});
  private table = process.env.APPOINTMENTS_TABLE!;

  async putItem(item: Record<string, any>) {
    const marshalled: Record<string, any> = {};
    // Simple marshalling para cadenas/nums/booleans - ampliar según necesidades
    for (const k of Object.keys(item)) {
      const v = item[k];
      if (typeof v === 'string') marshalled[k] = { S: v };
      else if (typeof v === 'number') marshalled[k] = { N: String(v) };
      else if (typeof v === 'boolean') marshalled[k] = { BOOL: v };
      else marshalled[k] = { S: JSON.stringify(v) };
    }

    await this.client.send(new PutItemCommand({
      TableName: this.table,
      Item: marshalled,
    }));
  }

  async queryByInsured(insuredId: string) {
    const params: QueryCommandInput = {
      TableName: this.table,
      IndexName: 'insuredId-index',
      KeyConditionExpression: 'insuredId = :iid',
      ExpressionAttributeValues: { ':iid': { S: insuredId } },
    };
    const res = await this.client.send(new QueryCommand(params));
    return res.Items ?? [];
  }

  async updateStatus(appointmentId: string, status: string) {
    await this.client.send(new UpdateItemCommand({
      TableName: this.table,
      Key: { appointmentId: { S: appointmentId } },
      UpdateExpression: 'SET #s = :st',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: { ':st': { S: status } },
    }));
  }
}
