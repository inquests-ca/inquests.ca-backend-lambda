console.log('Loading function');

import app from './app/app';
import { getSecret } from './aws/secrets';
import { createConnection, ConnectionOptions } from 'typeorm';
import awsServerlessExpress = require('aws-serverless-express');

const server = awsServerlessExpress.createServer(app);

const initConnection = async (): Promise<void> => {
  const connectionSecretString = await getSecret('prod/inquests.ca/MySQL');
  let connectionSecret;
  try {
    connectionSecret = JSON.parse(connectionSecretString);
  } catch (err) {
    console.log('Failed to parse connection secret object.');
    return;
  }
  const connectionOptions: ConnectionOptions = {
    type: 'mysql',
    host: connectionSecret.host,
    port: parseInt(connectionSecret.port),
    username: connectionSecret.username,
    password: connectionSecret.password,
    database: 'inquestsca',
    synchronize: false,
    logging: false,
    entities: ['entity/**/*.js'],
  };
  await createConnection(connectionOptions);
};

const handler = (event, context): void => {
  // TODO: should initConnection be outside the handler function?
  initConnection().then(() => {
    awsServerlessExpress.proxy(server, event, context);
  });
};

exports.handler = handler;
