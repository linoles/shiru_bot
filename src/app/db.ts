import sqlite3 from "sqlite3";

let db = new sqlite3.Database("src/app/users.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

export default db;
