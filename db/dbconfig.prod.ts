// TODO: expiration checker?
// TODO: asyncStackTraces
// TODO: tear down connection pool?
const dbconfig = {
    client: 'mysql',
    version: '5.7', // TODO: confirm version
    debug: true,
    connection: {
      host: process.env.RDS_HOST,
      user: process.env.RDS_USER,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DATABASE
    },
    pool: { min: 1, max: 1 }
  };

export default dbconfig