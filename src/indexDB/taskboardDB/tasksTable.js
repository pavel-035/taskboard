import taskboardDB from '@/indexDB/taskboardDB/index'

const tasksTable = {
  dbPromise: null,

  upgrade (event) {
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
    if (!tasksStoreObject.indexNames.contains('order')) tasksStoreObject.createIndex('order', 'order', { unique: false })
  },

  init (dbPromise) {
    this.dbPromise = dbPromise
    return this
  },

  // tasks CRUD
  async getAll () {
    try {
      const tx = this.dbPromise.transaction('tasks', 'readonly')
      const tasksStoreObject = tx.objectStore('tasks')
      const result = []

      let cursor = await tasksStoreObject.openCursor()

      while (cursor) {
        result.push(cursor.value)
        cursor = await cursor.continue()
      }

      return result
    } catch (error) {
      console.error('[DB] Getting tasks list', error)
      throw error
    }
  },
  async getById (id) {
    try {
      const tx = this.dbPromise.transaction('tasks', 'readonly')
      const tasksStoreObject = tx.objectStore('tasks')
      const response = await tasksStoreObject.get(id)

      return response ?? null
    } catch (error) {
      console.error('[DB] Finding task by ID', error)
      throw error
    }
  },
  async post (task) {
    try {
      const statusTasks = await taskboardDB.statuses.getTasksByStatusId(task.status_id)
      const tx = this.dbPromise.transaction('tasks', 'readwrite')
      const tasksStoreObject = tx.objectStore('tasks')
      const response = await tasksStoreObject.add({
        ...task,
        order: statusTasks.length
      })

      return response ?? null
    } catch (error) {
      console.error('[DB] Adding new task', error)
      throw error
    }
  },
  async patchOrder (id, updatedTask) {
    try {
      const oldTask = await this.getById(id)
      if (!oldTask) throw new Error(`Task with ID ${id} not found.`)

      const isStatusChanged = updatedTask.status_id !== oldTask.status_id

      if (isStatusChanged) {
        // update task orders by old status
        await this.recalculateOrder(oldTask.status_id, null, oldTask)
        // update task orders by new status
        await this.recalculateOrder(updatedTask.status_id, updatedTask, null)
      } else {
        await this.recalculateOrder(updatedTask.status_id, updatedTask, oldTask)
      }
    } catch (error) {
      console.error('[DB] Updating task order', error)
      throw error
    }
  },
  async recalculateOrder (statusId, updatedTask, oldTask) {
    try {
      const statusTasks = await taskboardDB.statuses.getTasksByStatusId(statusId)

      statusTasks.sort((a, b) => a.order - b.order)

      if (oldTask) statusTasks.splice(oldTask.order, 1)
      if (updatedTask) statusTasks.splice(updatedTask.order, 0, updatedTask)

      await Promise.all(statusTasks.map((task, index) => {
        return this.patch(task.id, { ...task, order: index })
      }))
    } catch (error) {
      console.error('[DB] Recalculating task order', error)
      throw error
    }
  },
  async patch (id, task) {
    try {
      const tx = this.dbPromise.transaction('tasks', 'readwrite')
      const tasksStore = tx.objectStore('tasks')
      const cursor = await tasksStore.openCursor(id)

      if (cursor) {
        await cursor.update(task)
        return task
      }
      return null
    } catch (error) {
      console.error('[DB] Updating task', error)
      throw error
    }
  },
  async del (id) {
    try {
      const taskToDelete = await this.getById(id)
      if (!taskToDelete) throw new Error(`Task with ID ${id} not found.`)

      const tx = this.dbPromise.transaction('tasks', 'readwrite')
      const tasksStore = tx.objectStore('tasks')
      const cursor = await tasksStore.openCursor(id)

      if (cursor) await cursor.delete()

      await this.recalculateOrder(taskToDelete.status_id, null, taskToDelete)
    } catch (error) {
      console.error('[DB] Deleting task', error)
      throw error
    }
  }
}

export default tasksTable
