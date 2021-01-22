const { Db } = require('../services/mockDb');

let dbInstance = new Db();
export const db = dbInstance;
