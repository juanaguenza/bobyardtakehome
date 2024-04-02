import pg from "pg";

var conString =
  "postgres://kukqqena:SlakV-y0b1HRtMh5VwOzHJY9C0EIKZhP@bubble.db.elephantsql.com/kukqqena"; // add to .env later if time
var client = new pg.Client(conString);

const initDB = async () => {
  client.connect(function (err: Error) {
    if (err) {
      return console.error("could not connect to postgres", err);
    }
  });
};

export { client, initDB };
