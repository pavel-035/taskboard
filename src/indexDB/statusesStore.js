const statusesStore = {
  dbPromise: null,

  update (event) {
    const db = event.target.result

    if (!db.objectStoreNames.contains('statuses')) {
      db.createObjectStore('statuses', {
        keyPath: 'id',
        autoIncrement: true
      })
    }

    const tx = event.target.transaction
    const statusesStoreObject = tx.objectStore('statuses')

    if (!statusesStoreObject.indexNames.contains('label')) statusesStoreObject.createIndex('label', 'label', { unique: false })
    if (!statusesStoreObject.indexNames.contains('color')) statusesStoreObject.createIndex('color', 'color', { unique: false })
  },
  init (dbPromise) {
    this.dbPromise = dbPromise
    return statusesStore
  },
  async get (key) {
    return await this.dbPromise.get('statuses', key)
  },
  async set (key, val) {
    return await this.dbPromise.put('statuses', val, key)
  },
  async del (key) {
    return await this.dbPromise.delete('statuses', key)
  }
}

export default statusesStore
