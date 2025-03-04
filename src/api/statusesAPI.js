import taskboardDB from '@/indexDB/taskboardDB'

export default {
  async fetchStatuses () {
    try {
      const response = await taskboardDB.statuses.get()

      return response ?? []
    } catch (error) {
      console.error(error)
    }
  },

  async addStatus (status) {
    try {
      await taskboardDB.statuses.post(status)
    } catch (error) {
      console.error(error)
    }
  },

  async editStatus (status) {
    try {
      await taskboardDB.statuses.patch(status.id, status)
    } catch (error) {
      console.error(error)
    }
  },

  async deleteStatus (id) {
    try {
      await taskboardDB.statuses.del(id)
    } catch (error) {
      console.error(error)
    }
  }
}
