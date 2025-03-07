import taskboardDB from '@/indexDB/taskboardDB'

export default {
  async fetchTasks () {
    try {
      const response = await taskboardDB.tasks.getAll()

      return response ?? []
    } catch (error) {
      console.error('[API] Fetching tasks', error)
      throw error
    }
  },
  async addTask (task) {
    try {
      await taskboardDB.tasks.post(task)
    } catch (error) {
      console.error('[API] Adding new task', error)
      throw error
    }
  },

  async editTask (task) {
    try {
      await taskboardDB.tasks.patch(task.id, task)
    } catch (error) {
      console.error('[API] Editing task', error)
      throw error
    }
  },

  async editOrder (task) {
    try {
      await taskboardDB.tasks.patchOrder(task.id, task)
    } catch (error) {
      console.error('[API] Updating task order', error)
      throw error
    }
  },

  async deleteTask (id) {
    try {
      await taskboardDB.tasks.del(id)
    } catch (error) {
      console.error('[API] Deleting task', error)
      throw error
    }
  }
}
