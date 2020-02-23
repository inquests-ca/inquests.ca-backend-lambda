// TODO: use dependency injection (or something similar) to pass around an instance of knex.
// TODO: use something similar to Play's application.conf for storing config variables.
import dbconfig from './dbconfig.prod';

const knex = require('knex')(dbconfig);

export default knex;
