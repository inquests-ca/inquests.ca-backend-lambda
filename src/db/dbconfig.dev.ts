const dbconfig = {
  client: 'mysql',
  version: '5.7',
  debug: true,
  connection: {
    host: '127.0.0.1',
    port: '3307',
    user: 'root',
    database: 'inquestsca',
  },
  pool: { min: 1, max: 1 },
};

export default dbconfig;
