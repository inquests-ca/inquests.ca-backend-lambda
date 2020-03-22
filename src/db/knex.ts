// TODO: use dependency injection (or something similar) to pass around an instance of knex.
// TODO: use something similar to Play's application.conf for storing config variables.
import dbconfig from './dbconfig.dev';
import * as knex from 'knex';

export default knex(dbconfig);
