require('dotenv').config();

import app from './app/app';
import { createConnection, getConnectionOptions } from 'typeorm';

const port = 9000;

const run = async (): Promise<void> => {
  // The default entity path is "entity/**/.js" as defined in ormconfig.ts, as for when the build
  // package is deployed to Lambda.
  // When running locally, the entity path should be "build/entity/**/*.js"
  const connectionOptions = await getConnectionOptions();
  await createConnection({ ...connectionOptions, entities: ['build/entity/**/*.js'] });
  app.listen(port, () => console.log(`Listening on port ${port}`));
};

run();
