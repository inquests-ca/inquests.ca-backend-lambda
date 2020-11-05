module.exports = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: ['dist/models/**/*.js'],
  cli: { entitiesDir: 'src/models' },
};
