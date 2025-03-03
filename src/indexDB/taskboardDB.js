import { openDB } from 'idb'
import tasksStore from '@/indexDB/tasksStore'
import statusesStore from '@/indexDB/statusesStore'

const DB_NAME = 'taskboard'
const DB_VERSION = 3

const taskboardDB = {
  dbPromise: null,

  tasks: null,
  statuses: null,

  init: async function () {
    try {
      this.dbPromise = await openDB(DB_NAME, DB_VERSION, {
        upgrade (db, oldVersion, newVersion, transaction, event) {
          tasksStore.update(event)
          statusesStore.update(event)
        }
      })

      // инициализация модулей хранилищ
      this.tasks = tasksStore.init(this.dbPromise)
      this.statuses = statusesStore.init(this.dbPromise)
    } catch (error) {
      console.error('ERROR: failed to open database:', error)
    }
  }
}

export default taskboardDB
