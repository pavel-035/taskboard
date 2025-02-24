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
    },

    CREATE_TASK (state, task) {
      state.tasks.push(task)
    },
    SET_TASK (state, { taskIndex, task }) {
      state.tasks[taskIndex] = task
    },
    DEL_TASK (state, { taskIndex }) {
      state.tasks.splice(taskIndex, 1)
    }
  },
  actions: {
    async fetchTasks ({ commit }) {
      try {
        const response = await fetch('data/tasks.json')
        const tasks = await response.json()

        commit('SET_TASKS', tasks)
      } catch (error) {
        console.error(error)
      }
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

    createTask ({ commit, state, dispatch }, task) {
      commit('CREATE_TASK', {
        description: task.description,
        status_id: task.status_id,
        id: state.tasks.at(-1).id + 1
      })

      dispatch('loadTasksByStatuses')
    },
    editTask ({ commit, state, dispatch }, newTaskData) {
      const tasks = state.tasks
      const taskIndex = tasks.findIndex(item => item.id === newTaskData.id)

      commit('SET_TASK', { taskIndex, task: newTaskData })
      dispatch('loadTasksByStatuses')
    },
    deleteTask ({ commit, state, dispatch }, taskId) {
      const tasks = state.tasks
      const taskIndex = tasks.findIndex(item => item.id === taskId)

      commit('DEL_TASK', { taskIndex })
      dispatch('loadTasksByStatuses')
    }
  },
  getters: {
    getTasks: state => state.tasks,
    getTasksByStatuses: (state) => state.tasksByStatuses
  }
}
