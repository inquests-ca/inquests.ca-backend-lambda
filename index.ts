console.log('Loading function');

import app from './app/app';
import awsServerlessExpress from 'aws-serverless-express';

const server = awsServerlessExpress.createServer(app);

const handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};

exports.handler = handler;
