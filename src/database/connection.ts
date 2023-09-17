import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.DATABASE_PORT as number | undefined

const database = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST,
    port: port,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
  },
})

export default database
