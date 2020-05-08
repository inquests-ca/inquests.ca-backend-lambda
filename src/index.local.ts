require('dotenv').config();

import app from './app/app';
import { createConnection, ConnectionOptions } from 'typeorm';

const port = 9000;

const connectionOptions: ConnectionOptions = {
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

createConnection(connectionOptions).then(() =>
  app.listen(port, () => console.log(`Listening on port ${port}`))
);
