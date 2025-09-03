import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Callback, Context, Handler } from 'aws-lambda';
import express from 'express';
import serverlessExpress from '@vendia/serverless-express';

let cachedServer: Handler;

export const bootstrapServer = async (module: any): Promise<Handler> => {
  if (!cachedServer) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(module, adapter);
    await app.init();
    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
};

export const createHandler = (module: any) => {
  return async (event: any, context: Context, callback: Callback) => {
    const server = await bootstrapServer(module);
    return server(event, context, callback);
  };
};
