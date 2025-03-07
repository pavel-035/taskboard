const statusesTable = {
  dbPromise: null,

  upgrade (event) {
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
    return statusesTable
  },

  // statuses CRUD
  async getAll () {
    try {
      const tx = this.dbPromise.transaction('statuses', 'readonly')
      const statusesStoreObject = tx.objectStore('statuses')
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
    try {
      const tx = this.dbPromise.transaction('statuses', 'readonly')
      const statusesStoreObject = tx.objectStore('statuses')
      const response = await statusesStoreObject.get(id)

      return response ?? null
    } catch (error) {
      console.error(error)
    }
  },
  async getTasksByStatuses () {
    try {
      const statuses = await this.getAll()
      const result = []

      for (const status of statuses) {
        const tx = this.dbPromise.transaction('tasks', 'readonly')
        const tasksStoreObject = tx.objectStore('tasks')
        const tasksIndex = tasksStoreObject.index('status_id')
        const statusTasks = []

        let cursor = await tasksIndex.openCursor(status.id)

        while (cursor) {
          statusTasks.push(cursor.value)
          cursor = await cursor.continue()
        }

        statusTasks.sort((a, b) => a.order - b.order)
        result.push({ ...status, tasks: statusTasks })
      }

      return result
    } catch (error) {
      console.error(error)
    }
  },
  async getTasksByStatusId (statusId) {
    try {
      const result = []
      const tx = this.dbPromise.transaction('tasks', 'readonly')
      const tasksStoreObject = tx.objectStore('tasks')
      const tasksIndex = tasksStoreObject.index('status_id')

      let cursor = await tasksIndex.openCursor(statusId)

      while (cursor) {
        result.push(cursor.value)
        cursor = await cursor.continue()
      }

      return result
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

export default statusesTable
