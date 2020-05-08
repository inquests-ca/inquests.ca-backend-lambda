import {
  Connection,
  ConnectionManager,
  createConnection,
  getConnectionManager,
  ConnectionOptions,
} from 'typeorm';
import { getSecret } from '../aws/secrets';

/**
 * Database connection management, based on https://medium.com/safara-engineering/wiring-up-typeorm-with-serverless-5cc29a18824f
 */
const CONNECTION_NAME = 'default';
const connectionManager: ConnectionManager = getConnectionManager();

const localConnectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: ['build/entity/**/*.js'],
  cli: { entitiesDir: 'src/entity' },
};

const getLambdaConnectionOptions = async (): Promise<ConnectionOptions> => {
  const connectionSecretString = await getSecret('prod/inquests.ca/MySQL');
  let connectionSecret;
  try {
    connectionSecret = JSON.parse(connectionSecretString);
  } catch (err) {
    const msg = 'Failed to parse database connection secret object.';
    console.log(msg);
    throw new Error(msg);
  }
  return {
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
};

const lambdaConnectionOptions: Promise<ConnectionOptions> = getLambdaConnectionOptions();

const reuseOrCreateConnection = async (
  connectionOptions: ConnectionOptions
): Promise<Connection> => {
  if (!connectionManager.has(CONNECTION_NAME)) {
    return createConnection(connectionOptions);
  } else {
    let connection: Connection = await connectionManager.get(CONNECTION_NAME);
    if (!connection.isConnected) connection = await connection.connect();
    return connection;
  }
};

export const getConnection = async (): Promise<Connection> => {
  if (process.env.ENV === 'dev') return reuseOrCreateConnection(localConnectionOptions);
  else {
    const connectionOptions = await lambdaConnectionOptions;
    return reuseOrCreateConnection(connectionOptions);
  }
};
