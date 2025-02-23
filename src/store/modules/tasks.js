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
    async fetchTasks ({ commit }) {
      try {
        const response = await fetch('data/tasks.json')
        const tasks = await response.json()

        commit('SET_TASKS', tasks)
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    getTasks: state => state.tasks
  }
}
