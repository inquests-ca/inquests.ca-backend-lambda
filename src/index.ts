// TODO: only enable locally.
require('dotenv').config();

import { createConnection } from 'typeorm';

import app from './app/app';

// PORT env variable is provided by Heroku
const port = process.env.PORT || 9000;

createConnection().then(() => app.listen(port, () => console.log(`Listening on port ${port}`)));
