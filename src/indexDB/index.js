import taskboardDB from '@/indexDB/taskboardDB'

export default {
  async init () {
    try {
      await taskboardDB.init()
    } catch (error) {
      console.error('Initialization error indexDB:', error)
    }
  }
}
