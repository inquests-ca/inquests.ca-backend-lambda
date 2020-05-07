// TODO: resolve compilation errors.
module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: process.env.DEBUG,
  entities: ['build/entity/**/*.js'],
  cli: { entitiesDir: 'src/entity' },
};
