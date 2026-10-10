const path = require('path');
const knex = require('knex');
const config = require('../config');

// PostgreSQL when DATABASE_URL is provided, otherwise a local SQLite file.
const db = config.databaseUrl
  ? knex({
      client: 'pg',
      connection: {
        connectionString: config.databaseUrl,
        ssl: config.isProd ? { rejectUnauthorized: false } : false,
      },
      pool: { min: 0, max: 5 },
    })
  : knex({
      client: 'better-sqlite3',
      connection: { filename: path.join(__dirname, '..', '..', 'database.sqlite3') },
      useNullAsDefault: true,
    });

module.exports = db;
