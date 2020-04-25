require('dotenv').config();

import app from './app/app';
import { createConnection } from 'typeorm';

const port = 9000;

createConnection().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
});
