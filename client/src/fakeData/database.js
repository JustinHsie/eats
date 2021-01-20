import { Database } from '../classes/database';

const listDatabase = new Database();
const placeDatabase = new Database();

export const database = {
  lists: listDatabase,
  places: placeDatabase,
};
