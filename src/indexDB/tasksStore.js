const tasksStore = {
  dbPromise: null,

  update (event) {
    const db = event.target.result

    if (!db.objectStoreNames.contains('tasks')) {
      db.createObjectStore('tasks', {
        keyPath: 'id',
        autoIncrement: true
      })
    }

    const tx = event.target.transaction
    const tasksStoreObject = tx.objectStore('tasks')

    if (!tasksStoreObject.indexNames.contains('description')) tasksStoreObject.createIndex('description', 'description', { unique: false })
    if (!tasksStoreObject.indexNames.contains('status_id')) tasksStoreObject.createIndex('status_id', 'status_id', { unique: false })
    if (!tasksStoreObject.indexNames.contains('queue_position')) tasksStoreObject.createIndex('queue_position', 'queue_position', { unique: false })
  },

  init (dbPromise) {
    this.dbPromise = dbPromise
    return tasksStore
  },

  async get (key) {
    return await this.dbPromise.get('tasks', key)
  },
  async set (key, val) {
    return await this.dbPromise.put('tasks', val, key)
  },
  async del (key) {
    return await this.dbPromise.delete('tasks', key)
  }
}

export default tasksStore
