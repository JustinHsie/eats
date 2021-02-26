export function migration(pool) {
  try {
    /**
     * Create users table
     */
    pool.query(
      `CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL,
          password TEXT NOT NULL
       )`
    );

    /**
     * Create lists table
     */
    pool.query(
      `CREATE TABLE IF NOT EXISTS lists (
          id SERIAL PRIMARY KEY,
          name VARCHAR(30),
          description TEXT,
          userid INT,
          FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
       )`
    );

    /**
     * Create places table
     */
    pool.query(
      `CREATE TABLE IF NOT EXISTS places (
          id SERIAL PRIMARY KEY,
          name TEXT,
          rating INT,
          description TEXT,
          listid INT,
          locationname TEXT,
          address TEXT,
          lat REAL,
          lng REAL,
          FOREIGN KEY (listid) REFERENCES lists(id) ON DELETE CASCADE
       )`
    );

    /**
     * Create session table
     */
    pool.query(
      `CREATE TABLE IF NOT EXISTS "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
      )
      WITH (OIDS=FALSE)`
    );
    // Workaround to add constraint bc ADD CONSTRAINT IF NOT EXISTS isn't allowed
    pool.query(
      `ALTER TABLE "session" DROP CONSTRAINT IF EXISTS "session_pkey"`
    );
    pool.query(
      `ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE`
    );
    pool.query(
      `CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire")`
    );
  } catch (err) {
    console.log(err.stack);
  }
}
