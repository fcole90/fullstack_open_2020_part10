require('dotenv').config();

const databaseFilename = process.env.DATABASE_FILENAME ?? 'database.sqlite';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: databaseFilename,
  },
  useNullAsDefault: true,
  migrations: {
    directory: `${__dirname}/migrations`,
  },
  seeds: {
    directory: `${__dirname}/seeds`,
  },
};
