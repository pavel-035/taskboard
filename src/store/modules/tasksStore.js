import api from '@/api'

export default {
  namespaced: true,

  state: () => {
    return {
      tasks: []
    }
  },
  mutations: {
    SET_TASKS (state, tasks) {
      state.tasks = tasks
    }
  },
  actions: {
    async loadTasks ({ commit, dispatch }) {
      try {
        const tasks = await api.tasks.fetchTasks()

        commit('SET_TASKS', tasks)
      } catch (error) {
        console.error('[STORE] Loading tasks', error)
        throw error
      }
    },
    async createTask ({ commit, state, dispatch }, task) {
      try {
        await api.tasks.addTask({
          description: task.description,
          status_id: task.status_id
        })
        await dispatch('loadTasks')
        await dispatch('statuses/loadTasksByStatuses', null, { root: true })
      } catch (error) {
        console.error('[STORE] Creating task', error)
        throw error
      }
    },
    async editTask ({ commit, state, dispatch }, { id, task }) {
      try {
        const targetTask = state.tasks.find(task => task.id === id)

        await api.tasks.editTask({ ...targetTask, ...task })
        await dispatch('loadTasks')
        await dispatch('statuses/loadTasksByStatuses', null, { root: true })
      } catch (error) {
        console.error('[STORE] Editing task', error)
        throw error
      }
    },
    async editOrder ({ commit, state, dispatch, getters }, { id, task }) {
      try {
        const targetTask = getters.getTaskById(id)

        await api.tasks.editOrder({ ...targetTask, ...task })
        await dispatch('loadTasks')
        await dispatch('statuses/loadTasksByStatuses', null, { root: true })
      } catch (error) {
        console.error('[STORE] Updating task order', error)
        throw error
      }
    },
    async deleteTask ({ commit, state, dispatch }, taskId) {
      try {
        await api.tasks.deleteTask(taskId)
        await dispatch('loadTasks')
        await dispatch('statuses/loadTasksByStatuses', null, { root: true })
      } catch (error) {
        console.error('[STORE] Deleting task', error)
        throw error
      }
    }
  },
  getters: {
    getTasks: state => state.tasks,
    getTaskById: state => id => state.tasks.find(task => task.id === id)
  }
}
