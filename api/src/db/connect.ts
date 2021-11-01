import knex from 'knex'
const pg = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 2137,
    user : 'postgres', //ENV
    password : 'password', //ENV
    database : 'postgres' //ENV?
  }
});

export default pg