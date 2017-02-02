const myArgs = process.argv[2];
const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.hostname,
  port      : settings.port,
  ssl       : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }


  console.log("Searching ...");
  client.query("SELECT * FROM famous_people WHERE first_name=$1::text OR last_name=$1::text",[myArgs], (err, result) => {
    if(err) {
      return console.error("error running query", err);
    }
    let results = result.rows;
    console.log("Found " + results.length + " person(s) by the name " + myArgs + ":");


    console.log(results[0].id + ": " + results[0].first_name + " " + results[0].last_name + ", born " + results[0].birthdate.toString().slice(0, 15));
    client.end();
  });
});