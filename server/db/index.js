import Pool from 'pg-pool';

class Database {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async getUserByUsername(username) {
    try {
      const res = await this.pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      const userQuery = res.rows[0];

      const user = {
        id: userQuery.id,
        username: userQuery.username,
        password: userQuery.password,
      };
      return user;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async createUser(username, password) {
    try {
      const res = await this.pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
        [username, password]
      );
      const { id } = res.rows[0];
      return id;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async getUserById(id) {
    try {
      const res = await this.pool.query('SELECT * FROM users WHERE id = $1', [
        id,
      ]);
      const userQuery = res.rows[0];

      const user = {
        id: userQuery.id,
        username: userQuery.username,
        password: userQuery.password,
      };
      return user;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async updateUserPassword(id, newPass) {
    try {
      await this.pool.query('UPDATE users SET password = $1 WHERE id = $2', [
        newPass,
        id,
      ]);
    } catch (err) {
      console.log(err.stack);
    }
  }

  async getPlace(placeId) {
    try {
      // Get place
      let res = await this.pool.query(
        `SELECT places.id AS placeid, places.name AS placename, places.rating, 
                places.description AS placedescription, places.locationname, 
                places.address, places.lat, places.lng, 
                lists.id AS listid, lists.name AS listname, lists.description AS listdescription,
                lists.userid 
         FROM places
         LEFT JOIN lists ON places.listid = lists.id
         WHERE places.id = $1`,
        [placeId]
      );
      const placeQuery = res.rows[0];

      // Create place object
      const place = {
        id: placeQuery.placeid,
        name: placeQuery.placename,
        rating: placeQuery.rating,
        description: placeQuery.placedescription,
        location: {
          name: placeQuery.locationname,
          address: placeQuery.address,
          mapCenter: {
            lat: placeQuery.lat,
            lng: placeQuery.lng,
          },
        },
        list: {
          id: placeQuery.listid,
          name: placeQuery.listname,
          description: placeQuery.listdescription,
          userid: placeQuery.userid,
        },
      };

      return place;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async createPlace(name, rating, description, location, list) {
    try {
      // Create place
      const listId = list.id;
      const locationName = location.name;
      const address = location.address;
      const lat = location.mapCenter.lat;
      const lng = location.mapCenter.lng;

      let res = await this.pool.query(
        `INSERT INTO places (name, rating, description, listid, locationname, address, lat, lng) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [name, rating, description, listId, locationName, address, lat, lng]
      );
      const placeId = res.rows[0].id;

      return placeId;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async updatePlace(placeId, name, rating, description, location, list) {
    try {
      // Update place
      const listId = list.id;
      const locationName = location.name;
      const address = location.address;
      const lat = location.mapCenter.lat;
      const lng = location.mapCenter.lng;
      await this.pool.query(
        `UPDATE places SET name = $1, rating = $2, description = $3, listid = $4, 
         locationname = $5, address = $6, lat = $7, lng = $8 
         WHERE id = $9`,
        [
          name,
          rating,
          description,
          listId,
          locationName,
          address,
          lat,
          lng,
          placeId,
        ]
      );

      return placeId;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async deletePlace(placeId) {
    try {
      await this.pool.query('DELETE FROM places WHERE id = $1', [placeId]);
    } catch (err) {
      console.log(err.stack);
    }
  }

  async getList(listId) {
    try {
      // Get list
      let res = await this.pool.query(
        `SELECT lists.id AS listid, lists.name AS listname, lists.description AS listdescription, 
                lists.userid,
                places.id AS placeid, places.name AS placename, places.rating, 
                places.description AS placedescription, places.locationname, 
                places.address, places.lat, places.lng 
         FROM lists
         LEFT JOIN places ON lists.id = places.listid
         WHERE lists.id = $1`,
        [listId]
      );
      const listQuery = res.rows;

      // Create list object
      const list = {
        id: listQuery[0].listid,
        name: listQuery[0].listname,
        description: listQuery[0].listdescription,
        places: listQuery
          .filter(row => {
            return row.placeid;
          })
          .map(row => {
            return {
              id: row.placeid,
              name: row.placename,
              rating: row.rating,
              description: row.placedescription,
              location: {
                name: row.locationname,
                address: row.address,
                mapCenter: {
                  lat: row.lat,
                  lng: row.lng,
                },
              },
              list: {
                id: listQuery[0].listid,
                name: listQuery[0].listname,
                description: listQuery[0].listdescription,
                userid: listQuery[0].userid,
              },
            };
          }),
      };

      return list;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async updateList(listId, name, description) {
    try {
      await this.pool.query(
        'UPDATE lists SET name = $1, description = $2 WHERE id = $3',
        [name, description, listId]
      );
    } catch (err) {
      console.log(err.stack);
    }
  }

  async deleteList(listId) {
    try {
      await this.pool.query('DELETE FROM lists WHERE id = $1', [listId]);
    } catch (err) {
      console.log(err.stack);
    }
  }

  async createList(name, description, userId) {
    try {
      let res = await this.pool.query(
        'INSERT INTO lists (name, description, userid) VALUES ($1, $2, $3) RETURNING id',
        [name, description, userId]
      );
      const { id } = res.rows[0];
      return id;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async getLists(userId) {
    let res = await this.pool.query('SELECT * FROM lists WHERE userid = $1', [
      userId,
    ]);
    return res.rows;
  }
}

export const db = new Database();
