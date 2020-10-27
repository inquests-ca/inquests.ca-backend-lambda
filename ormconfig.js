module.exports = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: ['dist/entity/**/*.js'],
  cli: { entitiesDir: 'src/entity' },
};
