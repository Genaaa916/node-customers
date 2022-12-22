const { Pool } = require('pg')

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "movie",
  password: "YOUR_DB_PASSWORD"
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}