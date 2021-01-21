const { uuid } = require('uuidv4')

/**
 * Utility to make an operation async
 */
function makeAsync(funcToBeMadeAsync) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = funcToBeMadeAsync()
      resolve(result)
    }, 500)
  })
}

/**
 * Utility to make deep copy of object
 */
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Mock list database.
 */
class ListDb {
  constructor() {
    this.lists = {}
  }

  createList(title, description) {
    const id = uuid()
    this.lists[id] = {
      title,
      description,
      placeIds: [],
    }

    return id
  }

  getLists() {
    return Object.keys(this.lists)
      .map((idx) => deepCopy(this.lists[idx])) 
  }

  getList(id) {
    return deepCopy(this.lists[id])
  }

  updateList(id, name, description) {
    this.lists[id].name = name
    this.lists[id].description = description
  }

  deleteList(id) {
    delete this.lists[id]
  }

  addPlaceToList(id, placeId) {
    this.lists[id].placeIds.push(placeId)
  }

  removePlaceFromList(id, placeId) {
    const idx = this.lists[id].placeIds
      .findIndex((el) => el === placeId)

    this.lists[id].placeIds.splice(idx, 1)
  }
}

/**
 * Mock place database.
 */
class PlaceDb {
  constructor() {
    this.places = {}
  }

  createPlace(name, rating, description, location) {
    const id = uuid()
    this.places[id] = {
      name,
      rating,
      description,
      location,
    }

    return id
  }

  getPlaces() {
    return Object.keys(this.places)
      .map((idx) => deepCopy(this.places[idx])) 
  }

  getPlace(id) {
    return deepCopy(this.places[id])
  }

  updatePlace(id, name, rating, description, location) {
    this.places[id].name = name
    this.places[id].rating = rating
    this.places[id].description = description
    this.places[id].location = location
  }

  deletePlace(id) {
    delete this.places[id]
  }
}

/**
 * Database
 * Operations are always async to simulate
 * real network call to an external/backend database
 */
class Db {
  constructor() {
    this.listDb = new ListDb()
    this.placeDb = new PlaceDb()
  }

  async createList(title, description) {
    return makeAsync(() => {
      return this.listDb.createList(title, description)
    })
  }

  async getLists() {
    return makeAsync(() => {
      return this.listDb.getLists()
    })
  }

  async getList(id) {
    return makeAsync(() => {
      const list = this.listDb.getList(id)

      const places = list.placeIds.map((id) => this.placeDb.getPlace(id))

      list.places = places
      delete list.placeIds

      return list
    })
  }

  async updateList(id, name, description) {
    return makeAsync(() => {
      return this.listDb.updateList(id, name, description)
    })
  }

  async deleteList(id) {
    return makeAsync(() => {
      return this.listDb.deleteList(id)
    })
  }

  async addPlaceToList(id, placeId) {
    return makeAsync(() => {
      return this.listDb.addPlaceToList(id, placeId)
    })
  }

  async removePlaceFromList(id, placeId) {
    return makeAsync(() => {
      return this.listDb.removePlaceFromList(id, placeId)
    })
  }

  async createPlace(name, rating, description, location) {
    return makeAsync(() => {
      return this.placeDb.createPlace(name, rating, description, location)
    })
  }

  async getPlaces() {
    return makeAsync(() => {
      return this.placeDb.getPlaces()
    })
  }

  async getPlace(id) {
    return makeAsync(() => {
      return this.placeDb.getPlace(id)
    })
  }

  async updatePlace(id, name, rating, description, location) {
    return makeAsync(() => {
      return this.placeDb.updatePlace(id, name, rating, description, location)
    })
  }

  async deletePlace(id) {
    return makeAsync(() => {
      return this.placeDb.deletePlace(id)
    })
  }
}

// Usage example
async function usageExample() {
  const db = new Db()

  const listId = await db.createList(
    'Favorite',
    'My favorite restaurant'
  )

  const placeId = await db.createPlace(
    'Some Sushi Place',
    5,
    'It is heavenly',
    'Heaven'
  )

  await db.addPlaceToList(listId, placeId)

  const listDetail = await db.getList(listId)

  console.log(listDetail)
  // {
  //   title: 'Favorite',
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

usageExample()

module.exports = {
  Db,
}
