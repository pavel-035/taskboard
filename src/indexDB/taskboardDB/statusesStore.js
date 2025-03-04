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

  // statuses CRUD
  async get () {
    const tx = this.dbPromise.transaction('statuses', 'readonly')
    const statusesStoreObject = tx.objectStore('statuses')

    try {
      const result = []
      let cursor = await statusesStoreObject.openCursor()

      while (cursor) {
        result.push(cursor.value)
        cursor = await cursor.continue()
      }

      await tx.done
      return result
    } catch (error) {
      console.error(error)
    }
  },
  async getById (id) {
    const tx = this.dbPromise.transaction('statuses', 'readonly')
    const statusesStoreObject = tx.objectStore('statuses')

    try {
      const response = await statusesStoreObject.openCursor(id)

      await tx.done
      return response
    } catch (error) {
      console.error(error)
    }
  },
  async post (task) {
    const tx = this.dbPromise.transaction('statuses', 'readwrite')
    const statusesStoreObject = tx.objectStore('statuses')

    try {
      const response = await statusesStoreObject.add(task)

      await tx.done
      return response
    } catch (error) {
      console.error(error)
    }
  },
  async patch (id, task) {
    const tx = this.dbPromise.transaction('statuses', 'readwrite')
    const statusesStoreObject = tx.objectStore('statuses')

    try {
      const cursor = await statusesStoreObject.openCursor(id)
      const response = await cursor.update(task)

      await tx.done
      return response
    } catch (error) {
      console.error(error)
    }
  },
  async del (id) {
    const tx = this.dbPromise.transaction('statuses', 'readwrite')
    const statusesStoreObject = tx.objectStore('statuses')

    try {
      const cursor = await statusesStoreObject.openCursor(id)
      const response = await cursor.delete()

      await tx.done
      return response
    } catch (error) {
      console.error(error)
    }
  }
}

export default statusesStore
