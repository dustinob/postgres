const firstName = process.argv[2];
const lastName = process.argv[3];
const date = process.argv[4];

const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

knex('famous_people').insert({
  first_name: firstName,
  last_name: lastName,
  birthdate: date
}).then((result) => {
  console.log(result);
})
.finally(function() {
  knex.destroy();
})
.catch((err) => {
  throw err;
});