import Pool from 'pg-pool';

class Database {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async getUserByUsername(username) {
    try {
      const res = await this.pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      return res.rows[0];
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
      return res.rows[0];
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
      let res = await this.pool.query('SELECT * FROM places WHERE id = $1', [
        placeId,
      ]);
      const place = res.rows[0];

      // Get place's list
      res = await this.pool.query('SELECT * FROM lists where id = $1', [
        place.listid,
      ]);
      const list = res.rows[0];

      // Get place's location
      res = await this.pool.query('SELECT * FROM locations WHERE id = $1', [
        placeId,
      ]);
      const location = res.rows[0];

      // Get location's map center
      res = await this.pool.query('SELECT * FROM mapcenters WHERE id = $1', [
        location.id,
      ]);
      const mapCenter = res.rows[0];

      // Add map center to location obj then add location to place obj
      location.mapCenter = mapCenter;
      place.location = location;
      place.list = list;

      return place;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async createPlace(name, rating, description, location, list) {
    try {
      // Create place
      const listId = list.id;
      let res = await this.pool.query(
        'INSERT INTO places (name, rating, description, listid) VALUES ($1, $2, $3, $4) RETURNING id',
        [name, rating, description, listId]
      );
      const placeId = res.rows[0].id;

      // Create place's location
      const locationName = location.name;
      const locationAddress = location.address;
      res = await this.pool.query(
        'INSERT INTO locations (name, address, placeid) VALUES ($1, $2, $3) RETURNING id',
        [locationName, locationAddress, placeId]
      );
      const locationId = res.rows[0].id;

      // Create locations' map center
      const lat = location.mapCenter.lat;
      const lng = location.mapCenter.lng;
      await this.pool.query(
        'INSERT INTO mapcenters (lat, lng, locationid) VALUES ($1, $2, $3)',
        [lat, lng, locationId]
      );

      return placeId;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async updatePlace(placeId, name, rating, description, location, list) {
    try {
      // Update place
      const listId = list.id;
      await this.pool.query(
        'UPDATE places SET name = $1, rating = $2, description = $3, listid = $4 WHERE id = $5',
        [name, rating, description, listId, placeId]
      );

      // Update place's location
      const locationName = location.name;
      const locationAddress = location.address;
      let res = await this.pool.query(
        'UPDATE locations SET name = $1, address = $2 WHERE placeid = $3 RETURNING id',
        [locationName, locationAddress, placeId]
      );
      const locationId = res.rows[0].id;

      // Create locations' map center
      const lat = location.mapCenter.lat;
      const lng = location.mapCenter.lng;
      await this.pool.query(
        'UPDATE mapcenters SET lat = $1, lng = $2 WHERE locationid = $3',
        [lat, lng, locationId]
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
      let res = await this.pool.query('SELECT * FROM lists WHERE id = $1', [
        listId,
      ]);
      const list = res.rows[0];

      // Get list's places
      res = await this.pool.query('SELECT id FROM places WHERE listid = $1', [
        listId,
      ]);
      const results = res.rows;
      const places = await Promise.all(
        results.map(async result => {
          return await this.getPlace(result.id);
        })
      );

      // Add array of places to list obj
      list.places = places;
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
