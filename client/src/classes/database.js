export class Database {
  constructor() {
    this.db = [];
  }
  /**
   * Get item
   *
   * @param index
   * @returns item
   */
  getItem(index) {
    return this.db[index];
  }

  
  /**
   * Add item to db
   *
   * @param item
   * @returns index of item
   */
  addItem(item) {
    this.db.push(item);
    return this.db.length - 1;
  }

  /**
   * Edit item
   *
   * @param index
   * @param item
   * @returns edited item
   */
  editItem(index, item) {
    this.db[index] = item;
    return this.db[index];
  }

  /**
   * Delete item
   *
   * @param index
   * @returns deleted item
   */
  deleteItem(index) {
    let deletedItem = this.db.splice(index, 1);
    return deletedItem;
  }
}