var dotenv = require('dotenv');

dotenv.load();

module.exports = {
  development: {
    client: 'pg',
    // pool: { min: 0, max: 0},
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  },
  production: {
    client: 'pg',
    // pool: { min: 0, max: 0},
    connection: process.env.DATABASE_URL
  }
};
