import taskboardDB from '@/indexDB/taskboardDB'

export default {
  async fetchTasks () {
    try {
      const response = await taskboardDB.tasks.get()

      return response ?? []
    } catch (error) {
      console.error(error)
    }
  },

  async addTask (task) {
    try {
      await taskboardDB.tasks.post(task)
    } catch (error) {
      console.error(error)
    }
  },

  async editTask (task) {
    try {
      await taskboardDB.tasks.patch(task.id, task)
    } catch (error) {
      console.error(error)
    }
  },

  async deleteTask (id) {
    try {
      await taskboardDB.tasks.del(id)
    } catch (error) {
      console.error(error)
    }
  }
}
