const  { resolve } = require('path');

module.exports =  {
  client: process.env.DATABASE_DIALECT,
  connection: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  pool: {
    min: parseInt(process.env.DATABASE_MIN_POOL) || 2,
    max: parseInt(process.env.DATABASE_MAX_POOL) ||10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: resolve(process.cwd(), 'src', 'database', 'migrations')
  },
  seeds: {
    directory: resolve(process.cwd(), 'src', 'database', 'seeds')
  },
  timezone: 'UTC'
}