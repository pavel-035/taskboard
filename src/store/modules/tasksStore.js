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
    async loadTasks ({ commit }) {
      const tasks = await api.tasks.fetchTasks()

      commit('SET_TASKS', tasks)
    },
    async createTask ({ commit, state, dispatch }, task) {
      await api.tasks.addTask({
        description: task.description,
        status_id: task.status_id
      })
      await dispatch('statuses/loadTasksByStatuses', null, { root: true })
    },
    async editTask ({ commit, state, dispatch }, { id, task }) {
      const targetTask = state.tasks.find(task => task.id === id)

      await api.tasks.editTask({ ...targetTask, ...task })
      await dispatch('statuses/loadTasksByStatuses', null, { root: true })
    },
    async editOrder ({ commit, state, dispatch }, { id, task }) {
      const targetTask = state.tasks.find(task => task.id === id)

      await api.tasks.editOrder({ ...targetTask, ...task })
      await dispatch('statuses/loadTasksByStatuses', null, { root: true })
    },
    async deleteTask ({ commit, state, dispatch }, taskId) {
      await api.tasks.deleteTask(taskId)
      await dispatch('statuses/loadTasksByStatuses', null, { root: true })
    }
  },
  getters: {
    getTasks: state => state.tasks
  }
}
