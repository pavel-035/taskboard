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

  // tasks CRUD
  async get () {
    const tx = this.dbPromise.transaction('tasks', 'readonly')
    const tasksStoreObject = tx.objectStore('tasks')

    try {
      const result = []
      let cursor = await tasksStoreObject.openCursor()

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
    const tx = this.dbPromise.transaction('tasks', 'readonly')
    const tasksStoreObject = tx.objectStore('tasks')

    try {
      const response = await tasksStoreObject.openCursor(id)

      await tx.done
      return response
    } catch (error) {
      console.error(error)
    }
  },
  async post (task) {
    const tx = this.dbPromise.transaction('tasks', 'readwrite')
    const tasksStoreObject = tx.objectStore('tasks')

    try {
      const response = await tasksStoreObject.add(task)

      await tx.done
      return response
    } catch (error) {
      console.error(error)
    }
  },
  async patch (id, task) {
    const tx = this.dbPromise.transaction('tasks', 'readwrite')
    const tasksStoreObject = tx.objectStore('tasks')

    try {
      const cursor = await tasksStoreObject.openCursor(id)
      const response = await cursor.update(task)

      await tx.done
      return response
    } catch (error) {
      console.error(error)
    }
  },
  async del (id) {
    const tx = this.dbPromise.transaction('tasks', 'readwrite')
    const tasksStoreObject = tx.objectStore('tasks')

    try {
      const cursor = await tasksStoreObject.openCursor(id)
      const response = await cursor.delete()

      await tx.done
      return response
    } catch (error) {
      console.error(error)
    }
  }
}

export default tasksStore
