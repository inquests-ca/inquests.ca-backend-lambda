console.log('Loading function');

import app from './app/app';
import { createConnection } from 'typeorm';
import awsServerlessExpress = require('aws-serverless-express');

const server = awsServerlessExpress.createServer(app);

const handler = (event, context): void => {
  createConnection().then(() => {
    awsServerlessExpress.proxy(server, event, context);
  });
};

exports.handler = handler;
