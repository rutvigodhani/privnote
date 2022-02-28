require('dotenv').config()
const { Pool } = require('pg')

var connection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
  }
});
pool.connect();
module.exports = pool;
