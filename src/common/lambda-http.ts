// src/common/lambda.ts
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, Callback, Handler } from 'aws-lambda';
import express from 'express';
import serverlessExpress from '@vendia/serverless-express';

let cached: Handler | null = null;

export const createHandler = (module: any) => {
  return async (event: any, context: Context, callback: Callback) => {
    if (!cached) {
      const expressApp = express();
      const adapter = new ExpressAdapter(expressApp);
      const app = await NestFactory.create(module, adapter, { logger: ['error', 'warn', 'log'] });
      // configurar middlewares globales si hace falta aquí (validation pipes, etc)
      await app.init();
      cached = serverlessExpress({ app: expressApp });
    }
    return cached(event, context, callback);
  };
};
