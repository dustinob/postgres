const myArgs = process.argv[2];
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

console.log("Searching ...");

knex.select('*')
.from('famous_people')
.where('first_name', myArgs)
.orWhere('last_name', myArgs)
.then((result) => {
  console.log("Found " + result.length + " person(s) by the name " + myArgs + ":");
  console.log(result[0].id + ": " + result[0].first_name + " " + result[0].last_name + ", born " + result[0].birthdate.toString().slice(0, 10))
})
.finally(function() {
  knex.destroy();
})
.catch((err) => {
  throw err;
});
