import knex from 'knex'
const pg = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'password',
    database : 'postgres'
  },
  acquireConnectionTimeout: 2000
});

export default pg