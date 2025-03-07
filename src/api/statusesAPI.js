import taskboardDB from '@/indexDB/taskboardDB'

export default {
  async fetchStatuses () {
    try {
      const response = await taskboardDB.statuses.getAll()

      return response ?? []
    } catch (error) {
      console.error('[API] Fetching statuses', error)
      throw error
    }
  },

  async fetchTasksByStatuses () {
    try {
      const response = await taskboardDB.statuses.getTasksByStatuses()

      return response ?? []
    } catch (error) {
      console.error('[API] Fetching tasks grouped by statuses', error)
      throw error
    }
  },

  async addStatus (status) {
    try {
      await taskboardDB.statuses.post(status)
    } catch (error) {
      console.error('[API] Adding new status', error)
      throw error
    }
  },

  async editStatus (status) {
    try {
      await taskboardDB.statuses.patch(status.id, status)
    } catch (error) {
      console.error('[API] Editing status', error)
      throw error
    }
  },

  async deleteStatus (id) {
    try {
      await taskboardDB.statuses.del(id)
    } catch (error) {
      console.error('[API] Deleting status', error)
      throw error
    }
  }
}
