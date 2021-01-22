import { Db } from '../services/mockDb';

let dbInstance = new Db();
export const db = dbInstance;
