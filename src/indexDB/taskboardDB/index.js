import { openDB } from 'idb'
import tasksTable from '@/indexDB/taskboardDB/tasksTable'
import statusesTable from '@/indexDB/taskboardDB/statusesTable'

const DB_NAME = 'taskboard'
const DB_VERSION = 4

const taskboardDB = {
  dbPromise: null,

  tasks: null,
  statuses: null,

  init: async function () {
    try {
      this.dbPromise = await openDB(DB_NAME, DB_VERSION, {
        upgrade (db, oldVersion, newVersion, transaction, event) {
          tasksTable.upgrade(event)
          statusesTable.upgrade(event)
        }
      })

      // инициализация модулей хранилищ
      this.tasks = tasksTable.init(this.dbPromise)
      this.statuses = statusesTable.init(this.dbPromise)
    } catch (error) {
      console.error('ERROR: failed to open database:', error)
    }
  }
}

export default taskboardDB
