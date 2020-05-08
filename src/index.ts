console.log('Loading function');

import app from './app/app';
import { getSecret } from './aws/secrets';
import { createConnection, ConnectionOptions } from 'typeorm';
import awsServerlessExpress = require('aws-serverless-express');

const server = awsServerlessExpress.createServer(app);

const initConnection = async (): Promise<void> => {
  console.log('Getting secret');
  const connectionSecretString = await getSecret('prod/inquests.ca/MySQL');
  console.log(`SECRET: ${connectionSecretString}`);
  let connectionSecret;
  try {
    connectionSecret = JSON.parse(connectionSecret);
  } catch (err) {
    console.log(`Could not parse connection secret object: ${err.message()}`);
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
  console.log('Creating handler');
  initConnection().then(() => {
    awsServerlessExpress.proxy(server, event, context);
  });
};

exports.handler = handler;
