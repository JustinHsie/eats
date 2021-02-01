import { v4 } from 'uuid';

/**
 * Utility to make an operation async
 */
function makeAsync(funcToBeMadeAsync) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = funcToBeMadeAsync();
      resolve(result);
    }, 500);
  });
}

/**
 * Utility to make deep copy of object
 */
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Mock list database.
 */
class ListDb {
  constructor() {
    this.lists = {};
  }

  createList(name, description) {
    const id = v4();
    this.lists[id] = {
      id,
      name,
      description,
      placeIds: [],
    };

    return id;
  }

  getLists() {
    return Object.keys(this.lists).map(idx => deepCopy(this.lists[idx]));
  }

  getList(id) {
    return deepCopy(this.lists[id]);
  }

  updateList(id, name, description) {
    this.lists[id].name = name;
    this.lists[id].description = description;
  }

  deleteList(id) {
    delete this.lists[id];
  }

  addPlaceToList(id, placeId) {
    this.lists[id].placeIds.push(placeId);
  }

  removePlaceFromList(id, placeId) {
    const idx = this.lists[id].placeIds.findIndex(el => el === placeId);

    this.lists[id].placeIds.splice(idx, 1);
  }
}

/**
 * Mock place database.
 */
class PlaceDb {
  constructor() {
    this.places = {};
  }

  createPlace(name, rating, description, location, list) {
    const id = v4();
    this.places[id] = {
      id,
      name,
      rating,
      description,
      location,
      list,
    };

    return id;
  }

  getPlaces() {
    return Object.keys(this.places).map(idx => deepCopy(this.places[idx]));
  }

  getPlace(id) {
    return deepCopy(this.places[id]);
  }

  updatePlace(id, name, rating, description, location, list) {
    this.places[id].name = name;
    this.places[id].rating = rating;
    this.places[id].description = description;
    this.places[id].location = location;
    this.places[id].list = list;
  }

  deletePlace(id) {
    delete this.places[id];
  }
}

/**
 * Database
 * Operations are always async to simulate
 * real network call to an external/backend database
 */
export class Db {
  constructor() {
    this.listDb = new ListDb();
    this.placeDb = new PlaceDb();
  }

  async createList(name, description) {
    return makeAsync(() => {
      return this.listDb.createList(name, description);
    });
  }

  async getLists() {
    return makeAsync(() => {
      return this.listDb.getLists();
    });
  }

  async getList(id) {
    return makeAsync(() => {
      const list = this.listDb.getList(id);

      const places = list.placeIds.map(id => this.placeDb.getPlace(id));

      list.places = places;
      delete list.placeIds;

      return list;
    });
  }

  async updateList(id, name, description) {
    return makeAsync(() => {
      return this.listDb.updateList(id, name, description);
    });
  }

  async deleteList(id) {
    return makeAsync(() => {
      return this.listDb.deleteList(id);
    });
  }

  async addPlaceToList(id, placeId) {
    return makeAsync(() => {
      this.listDb.addPlaceToList(id, placeId);
      return this.getList(id);
    });
  }

  async removePlaceFromList(id, placeId) {
    return makeAsync(() => {
      this.listDb.removePlaceFromList(id, placeId);
      return this.getList(id);
    });
  }

  async createPlace(name, rating, description, location, list) {
    return makeAsync(() => {
      return this.placeDb.createPlace(
        name,
        rating,
        description,
        location,
        list
      );
    });
  }

  async getPlaces() {
    return makeAsync(() => {
      return this.placeDb.getPlaces();
    });
  }

  async getPlace(id) {
    return makeAsync(() => {
      return this.placeDb.getPlace(id);
    });
  }

  async updatePlace(id, name, rating, description, location, list) {
    return makeAsync(() => {
      return this.placeDb.updatePlace(
        id,
        name,
        rating,
        description,
        location,
        list
      );
    });
  }

  async deletePlace(id) {
    return makeAsync(() => {
      return this.placeDb.deletePlace(id);
    });
  }
}

/*
// Usage example
async function usageExample() {
  const db = new Db();

  const listId = await db.createList('Favorite', 'My favorite restaurant');

  const placeId = await db.createPlace(
    'Some Sushi Place',
    5,
    'It is heavenly',
    'Heaven'
  );

  await db.addPlaceToList(listId, placeId);

  const listDetail = await db.getList(listId);

  console.log(listDetail);
  // {
  //   name: 'Favorite',
  //   description: 'My favorite restaurant',
  //   places: [
  //     {
  //       name: 'Some Sushi Place',
  //       rating: 5,
  //       description: 'It is heavenly',
  //       location: 'Heaven'
  //     }
  //   ]
  // }
}

usageExample();
*/
