import { Db } from '../services/mockDb.js';

let dbInstance = new Db();
export const db = dbInstance;
