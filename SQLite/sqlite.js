const sqlite = require('sqlite3').verbose
let Database = new sqlite.Database('./SQLite/OWO.db', (err) => {
  if (err) {
    console.log(err.message)
  };
};
                                   
Database.run('CREATE TABLE codes(discordUserID accountName code)');



Database.close();
