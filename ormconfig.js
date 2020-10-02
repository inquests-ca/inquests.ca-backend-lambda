module.exports = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  // TODO: disable.
  synchronize: false,
  // TODO: disable in production.
  logging: true,
  entities: ['build/entity/**/*.js'],
  cli: { entitiesDir: 'src/entity' },
};
