import sqlite3 from 'sqlite3'

sqlite3.verbose();
    
  const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
      console.error('Error opening database', err);
    } else {
      // dropDb()
      console.log('Database opened successfully');
      db.run(`CREATE TABLE IF NOT EXISTS gigs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        gigId TEXT,
        imageUrl TEXT NOT NULL,
        profileLink TEXT,
        username TEXT NOT NULL DEFAULT "Fiverr User",
        gigLink TEXT,
        gigDescription TEXT,
        rating REAL DEFAULT 0,
        numberOfReviews INTEGER DEFAULT 0,
        price REAL
      )`, (err) => {
        if (err) {
          console.error('Error creating table', err);
        } else {
          console.log('Table created successfully');
        }
      });
      db.run(`CREATE TABLE IF NOT EXISTS cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        card_number BIGINT,
        expire_mm INTEGER,
        expire_yy INTEGER,
        name_on_card TEXT,
        cvv INTEGER,
        pin INTEGER,
        balance REAL DEFAULT 0,
        last_otp INTEGER DEFAULT NULL,
        amount_to_charge REAL,
        reference TEXT,
        device_information TEXT
      )`, (err) => {
        if (err) {
          console.error('Error creating cards table', err);
        } else {
          console.log('Cards table created successfully');
        }
      });
    }
  });

  const dropDb = () => {
    db.run('DROP TABLE IF EXISTS gigs');
    db.run('DROP TABLE IF EXISTS cards');
  }
  export {db};