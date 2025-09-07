import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppointmentModule } from '../appointment.module';

let cached: INestApplicationContext | null = null;

export const getWorkerContext = async (): Promise<INestApplicationContext> => {
  if (!cached) {
    cached = await NestFactory.createApplicationContext(AppointmentModule, { logger: ['error','warn','log'] });
  }
  return cached;
};
