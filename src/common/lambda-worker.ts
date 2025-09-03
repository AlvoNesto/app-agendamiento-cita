// src/common/worker.ts
import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';

let cached: INestApplicationContext | null = null;

export const createWorker = async (module: any) => {
  if (!cached) {
    cached = await NestFactory.createApplicationContext(module, { logger: ['error', 'warn', 'log'] });
  }
  return cached;
};
