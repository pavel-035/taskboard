import api from '@/api'

export default {
  namespaced: true,

  state: () => {
    return {
      tasks: [],
      tasksByStatuses: {}
    }
  },
  mutations: {
    SET_TASKS (state, tasks) {
      state.tasks = tasks
    },
    SET_TASKS_BY_STATUSES (state, tasksByStatuses) {
      state.tasksByStatuses = tasksByStatuses
    }
  },
  actions: {
    async loadTasks ({ commit }) {
      const tasks = await api.tasks.fetchTasks()

      commit('SET_TASKS', tasks)
    },
    loadTasksByStatuses ({ commit, getters, rootGetters }) {
      const statuses = rootGetters['statuses/getStatuses']
      const tasks = getters.getTasks
      const tasksByStatuses = {}

      if (!statuses.length) {
        console.error(`
          Error: statuses is not defined or empty
          Error in: @/store/modules/tasks.js -> actions -> loadTasksByStatuses.
        `)
        return
      }

      statuses.forEach(status => {
        tasksByStatuses[status.id] = []

        tasks.forEach((task) => {
          if (status.id === task.status_id) {
            tasksByStatuses[status.id].push(task)
          }
        })
      })

      commit('SET_TASKS_BY_STATUSES', tasksByStatuses)
    },

    async createTask ({ commit, state, dispatch }, task) {
      await api.tasks.addTask({
        description: task.description,
        status_id: task.status_id,
        queue_position: 0
      })
      await dispatch('loadTasks')
      dispatch('loadTasksByStatuses')
    },
    async editTask ({ commit, state, dispatch }, { id, task }) {
      const targetTask = state.tasks.find(task => task.id === id)

      await api.tasks.editTask({ ...targetTask, ...task })
      await dispatch('loadTasks')
      dispatch('loadTasksByStatuses')
    },
    async deleteTask ({ commit, state, dispatch }, taskId) {
      await api.tasks.deleteTask(taskId)
      await dispatch('loadTasks')
      dispatch('loadTasksByStatuses')
    }
  },
  getters: {
    getTasks: state => state.tasks,
    getTasksByStatuses: (state) => state.tasksByStatuses
  }
}
